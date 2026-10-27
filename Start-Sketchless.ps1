param([ValidateRange(1,65535)][int]$Port = 8000)
$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$pythonExe = Join-Path $projectRoot '.venv\Scripts\python.exe'
$frontendRoot = Join-Path $projectRoot 'frontend'
$url = "http://127.0.0.1:$Port"
try { $existing = Invoke-RestMethod -Uri "$url/api/config" -TimeoutSec 2 } catch { $existing = $null }
if (-not (Test-Path -LiteralPath $pythonExe) -and -not ($existing -and $existing.name -eq 'Sketchless')) {
    throw 'Sketchless needs its Python environment. Follow the fresh installation steps in README.md first.'
}
$indexFile = Join-Path $frontendRoot 'dist\index.html'
$needsBuild = -not (Test-Path -LiteralPath $indexFile)
if (-not $needsBuild) {
    $builtAt = (Get-Item -LiteralPath $indexFile).LastWriteTimeUtc
    $sourceFiles = @(Get-ChildItem -LiteralPath (Join-Path $frontendRoot 'src') -File -Recurse)
    $assetRoot = Join-Path $frontendRoot 'public'
    if (Test-Path -LiteralPath $assetRoot) { $sourceFiles += @(Get-ChildItem -LiteralPath $assetRoot -File -Recurse) }
    $sourceFiles += @(Get-Item -LiteralPath (Join-Path $frontendRoot 'index.html'),(Join-Path $frontendRoot 'package.json'),(Join-Path $frontendRoot 'package-lock.json'),(Join-Path $frontendRoot 'vite.config.js'),(Join-Path $frontendRoot 'tsconfig.json'))
    $needsBuild = @($sourceFiles | Where-Object { $_.LastWriteTimeUtc -gt $builtAt }).Count -gt 0
}
if ($needsBuild) {
    if (-not (Test-Path -LiteralPath (Join-Path $frontendRoot 'node_modules'))) {
        throw 'Frontend dependencies are missing. Run npm ci inside frontend, then start Sketchless again.'
    }
    Write-Host 'Preparing the Sketchless interface...'
    Push-Location $frontendRoot
    try {
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) { throw 'The interface build failed. Check the error above.' }
    } finally { Pop-Location }
}
if ($existing -and $existing.name -eq 'Sketchless') {
    Write-Host "Sketchless is already running. Open $url" -ForegroundColor Green
    return
}
Write-Host 'Starting Sketchless. Keep this terminal open while you use it.' -ForegroundColor Green
Write-Host "Open $url after the server reports startup complete. Press Ctrl+C to stop."
Push-Location $projectRoot
try {
    & $pythonExe -m uvicorn backend.app:app --host 127.0.0.1 --port $Port --no-access-log
    if ($LASTEXITCODE -ne 0) { throw 'Sketchless could not start. The port may already be in use; try -Port 8001.' }
} finally { Pop-Location }
