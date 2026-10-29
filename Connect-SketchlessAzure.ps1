# Run in your own interactive PowerShell window. Never prints tokens or creates resources.
$ErrorActionPreference = 'Stop'
$pythonExe = Join-Path $PSScriptRoot '.bootstrap\azure-cli\Scripts\python.exe'
if (-not (Test-Path -LiteralPath $pythonExe)) {
    throw 'The project-local Azure CLI is missing. Ask for the Azure CLI setup step before continuing.'
}
$previousConfig = $env:AZURE_CONFIG_DIR
$previousExperience = $env:AZURE_CORE_LOGIN_EXPERIENCE_V2
try {
    $env:AZURE_CONFIG_DIR = Join-Path $PSScriptRoot 'data\azure-cli'
    $env:AZURE_CORE_LOGIN_EXPERIENCE_V2 = 'off'
    Write-Host 'Opening Microsoft Azure CLI sign-in. Choose the account with your student benefit.'
    Write-Host 'This only signs in. It does not create resources, spend credit or change access policies.'
    & $pythonExe -m azure.cli login --allow-no-subscriptions --output none
    if ($LASTEXITCODE -ne 0) {
        throw 'Azure sign-in did not complete. Share the error message only; never share passwords or tokens.'
    }
    Write-Host 'Azure sign-in completed. Return to the chat and say signed in.' -ForegroundColor Green
} finally {
    $env:AZURE_CONFIG_DIR = $previousConfig
    $env:AZURE_CORE_LOGIN_EXPERIENCE_V2 = $previousExperience
}
