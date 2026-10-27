# Run locally to configure the backend without pasting a key into chat or a command line.
param()
$ErrorActionPreference = 'Stop'
function Update-SketchlessAIEnvironment {
    param([string]$Content, [string]$Key)
    if ([string]::IsNullOrWhiteSpace($Key) -or $Key -match '[\r\n\s"\x27\\]') {
        throw 'Enter a single API key without spaces or quotation marks.'
    }
    # Remove duplicate assignments, preserve other settings and comments.
    $kept = @($Content -split '\r?\n' | Where-Object { $_ -notmatch '^\s*(?:export\s+)?(?:OPENAI_API_KEY|OPENAI_MODEL|GEMINI_API_KEY|GEMINI_FREE_TIER_CONFIRMED|DEMO_MODE)\s*=' })
    return (($kept -join "`n").TrimEnd() + "`nGEMINI_API_KEY=$Key`nGEMINI_FREE_TIER_CONFIRMED=true`nDEMO_MODE=false`n")
}
if ($MyInvocation.InvocationName -eq '.') { return }
$envFile = Join-Path $PSScriptRoot '.env'
$exampleFile = Join-Path $PSScriptRoot '.env.example'
$existing = if (Test-Path -LiteralPath $envFile) { [IO.File]::ReadAllText($envFile) } else { [IO.File]::ReadAllText($exampleFile) }
Write-Host 'Configure Sketchless with the Gemini Developer API Free Tier.'
Write-Host 'Create a key at https://aistudio.google.com/api-keys in a Free Tier project.'
Write-Host 'Do not link billing. A key alone cannot tell Sketchless whether Google will charge.'
$freeTier = Read-Host 'Confirm the key project shows Free Tier and has NO billing linked (type FREE)'
if ($freeTier -cne 'FREE') { throw 'No settings changed. Use a Free Tier project with no billing linked.' }
Write-Host 'Your key stays in this project''s ignored backend .env file.'
Write-Host 'This command does not call the API or test the key. Generation uses your Gemini project free quota; quota errors stop without fallback.'
$secureKey = Read-Host 'Enter your Gemini API key (input is hidden)' -AsSecureString
$keyPointer = [IntPtr]::Zero
try {
    $keyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
    $plainKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPointer)
    $updated = Update-SketchlessAIEnvironment -Content $existing -Key $plainKey
    if ($updated -notmatch '(?m)^\s*GEMINI_MODEL\s*=') { $updated += "GEMINI_MODEL=gemini-3.5-flash-lite`n" }
    [IO.File]::WriteAllText($envFile, $updated, [Text.UTF8Encoding]::new($false))
    Write-Host 'Configuration saved. Stop the existing Sketchless server, then run .\Start-Sketchless.ps1.' -ForegroundColor Green
    Write-Host 'No API request was made. Refresh the app after restarting to enable the description button.'
} finally {
    if ($keyPointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPointer) }
    $plainKey = $null
    $updated = $null
    $secureKey.Dispose()
}
