# Private management credentials for provisioning a separate Free service/project.
# These keys are never copied into the frontend or the hosted application's environment.
$ErrorActionPreference = 'Stop'
function Read-PrivateValue([string]$Prompt) {
    $secure = Read-Host $Prompt -AsSecureString
    $pointer = [IntPtr]::Zero
    try {
        $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
        $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
        if ([string]::IsNullOrWhiteSpace($plain) -or $plain -match '\s') {
            throw 'Enter one key without whitespace. No credentials were printed.'
        }
        return $plain
    } finally {
        if ($pointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
        $secure.Dispose()
    }
}
Write-Host 'Configure private Render and Neon management keys for a separate Sketchless deployment.'
Write-Host 'Keep both accounts on Free plans with no payment method. Existing services will not be modified.'
$confirmation = Read-Host 'Confirm both accounts use Free plans and have NO payment method (type FREE)'
if ($confirmation -cne 'FREE') { throw 'Nothing changed. A paid plan or linked payment method needs a separate review.' }
Write-Host 'Create a Render API key under Account Settings > API Keys.'
Write-Host 'Create a Neon personal API key under your account API-key settings.'
Write-Host 'Use dedicated keys for this setup; they can be revoked after deployment.'
$renderKey = $null
$neonKey = $null
try {
    $renderKey = Read-PrivateValue 'Render API key (hidden)'
    $neonKey = Read-PrivateValue 'Neon API key (hidden)'
    $folder = Join-Path $PSScriptRoot 'data'
    [IO.Directory]::CreateDirectory($folder) | Out-Null
    $file = Join-Path $folder 'hosting-credentials.json'
    if (-not (Test-Path -LiteralPath $file)) { [IO.File]::WriteAllText($file, '') }
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
    $acl = New-Object Security.AccessControl.FileSecurity
    $acl.SetOwner([Security.Principal.NTAccount]::new($identity))
    $acl.SetAccessRuleProtection($true, $false)
    $acl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new($identity, 'FullControl', 'Allow'))
    $acl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new('NT AUTHORITY\SYSTEM', 'FullControl', 'Allow'))
    Set-Acl -LiteralPath $file -AclObject $acl
    $settings = @{render_api_key=$renderKey; neon_api_key=$neonKey; free_plans_confirmed=$true} | ConvertTo-Json
    [IO.File]::WriteAllText($file, $settings, [Text.UTF8Encoding]::new($false))
    Write-Host 'Private hosting credentials saved. No provider requests were made.' -ForegroundColor Green
    Write-Host 'Return to the chat and say hosting credentials configured. Do not paste the keys.'
} finally {
    $renderKey = $null
    $neonKey = $null
    $settings = $null
}
