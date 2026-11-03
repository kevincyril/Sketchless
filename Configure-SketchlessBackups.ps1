param(
    [switch]$CheckOnly,
    [string]$ClientJson
)
$ErrorActionPreference = 'Stop'
Write-Host 'Authorize Google Drive backups without entering secrets in chat.'
Write-Host 'Use a Desktop OAuth client with only drive.file access. Do not enable billing.'
$clientPath = $ClientJson
if ([string]::IsNullOrWhiteSpace($clientPath)) {
    $clientPath = Read-Host 'Path to the downloaded Google Desktop OAuth client JSON'
}
$folder = Join-Path $PSScriptRoot 'data/backup-setup'
[IO.Directory]::CreateDirectory($folder) | Out-Null
$identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
& icacls $folder /inheritance:r /grant:r "${identity}:(OI)(CI)F" 'SYSTEM:(OI)(CI)F' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Cannot protect the setup directory; nothing will be written.' }
Push-Location $PSScriptRoot
try {
    $helperArgs = @('-m', 'scripts.configure_drive_backup', '--client', $clientPath, '--output-dir', $folder)
    if ($CheckOnly) { $helperArgs += '--check-only' }
    & '.\.venv\Scripts\python.exe' @helperArgs
    if ($LASTEXITCODE -ne 0) { throw 'Drive setup stopped. The preceding diagnostic identifies the stage and error type without secret values. The schedule remains disabled.' }
    if ($CheckOnly) {
        Write-Host 'Preflight passed. No browser, Google request, secret upload or schedule change was performed.'
        return
    }
    $runtime = Join-Path $folder 'backup.env'
    if (Test-Path -LiteralPath $runtime) {
        Write-Host 'Existing dedicated read-only Neon backup configuration was preserved.'
        & '.\.venv\Scripts\python.exe' -m scripts.upload_backup_secrets
        if ($LASTEXITCODE -ne 0) { throw 'Encrypted secret upload did not finish; the schedule stays disabled.' }
        return
    }
    $settings = [ordered]@{
        SKETCHLESS_STORAGE_MODE = 'neon'
        SKETCHLESS_FREE_HOSTING_CONFIRMED = 'true'
    }
    foreach ($entry in @(
        @('SKETCHLESS_DATABASE_URL', 'Dedicated read-only Neon direct database URL (sslmode=verify-full)'),
        @('SKETCHLESS_STORAGE_ENDPOINT', 'Neon private object-storage HTTPS endpoint'),
        @('SKETCHLESS_STORAGE_REGION', 'Neon object-storage region'),
        @('SKETCHLESS_STORAGE_BUCKET', 'Existing private CAD bucket name'),
        @('SKETCHLESS_STORAGE_ACCESS_KEY', 'Dedicated Neon object-download access key'),
        @('SKETCHLESS_STORAGE_SECRET_KEY', 'Dedicated Neon object-download secret key')
    )) {
        $secure = Read-Host $entry[1] -AsSecureString
        $pointer = [IntPtr]::Zero
        try {
            $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
            $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
            if ([string]::IsNullOrWhiteSpace($value) -or $value -match '[\r\n\s''"]') { throw 'Enter a single value without quotes or whitespace; no secrets were printed.' }
            $settings[$entry[0]] = $value
        } finally {
            if ($pointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
            $secure.Dispose()
            $value = $null
        }
    }
    $lines = foreach ($key in $settings.Keys) { "$key=$($settings[$key])" }
    [IO.File]::WriteAllLines($runtime, $lines, [Text.UTF8Encoding]::new($false))
    $settings.Clear()
    $lines = $null
    Write-Host 'Private files are in data/backup-setup. Use GitHub Actions secrets or the secure uploader; never paste these files into chat.'
} finally { Pop-Location }
