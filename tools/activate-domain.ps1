$ErrorActionPreference = 'Stop'
$conceptIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
$conceptPrincipal = [Security.Principal.WindowsPrincipal]::new($conceptIdentity)
if (-not $conceptPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw 'Right-click activate-domain.cmd and choose Run as administrator. Or use http://localhost/dunnio-homepage-concepts/ now.'
}
$conceptProject = 'C:\laragon\www\dunnio-homepage-concepts'
$conceptHosts = 'C:\Windows\System32\drivers\etc\hosts'
$conceptVhost = 'C:\laragon\etc\apache2\sites-enabled\auto.dunnio-homepage-concepts.test.conf'
if (-not (Test-Path -LiteralPath $conceptVhost)) { Copy-Item -LiteralPath (Join-Path $conceptProject 'config\auto.dunnio-homepage-concepts.test.conf') -Destination $conceptVhost }
$conceptContent = Get-Content -LiteralPath $conceptHosts -Raw
$conceptName = 'dunnio-homepage-concepts.test'
if ($conceptContent -notmatch '(?im)^\s*127\.0\.0\.1\s+[^#\r\n]*\bdunnio-homepage-concepts\.test\b') {
    if ($conceptContent -match '(?im)^[^#\r\n]+\bdunnio-homepage-concepts\.test\b') { throw 'Conflicting hosts mapping found. It was preserved.' }
    $conceptLocal = Join-Path $conceptProject '.local'
    New-Item -ItemType Directory -Path $conceptLocal -Force | Out-Null
    Copy-Item -LiteralPath $conceptHosts -Destination (Join-Path $conceptLocal ('hosts-backup-' + (Get-Date -Format yyyyMMdd-HHmmss) + '.txt'))
    Add-Content -LiteralPath $conceptHosts -Value "`r`n127.0.0.1 dunnio-homepage-concepts.test #laragon magic!" -Encoding ascii
}
& ipconfig.exe /flushdns
Write-Host 'Click Reload once in Laragon, then open http://dunnio-homepage-concepts.test/'
Write-Host 'No Apache/MySQL processes were started or stopped by this script.'
