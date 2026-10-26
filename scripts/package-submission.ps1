$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$submission = Join-Path $root 'submission'
$stage = Join-Path $submission 'HairFit-source'
$zip = Join-Path $submission 'HairFit-source.zip'

Remove-Item -LiteralPath $stage -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $stage | Out-Null

$files = @(
    'index.html', 'package.json', 'package-lock.json', '.env.example',
    '.gitignore', 'README.md', 'LICENSE', 'HACKATHON_BRIEF.md',
    'ASSET_PROVENANCE.md', 'THIRD_PARTY_NOTICES.md', 'SUBMISSION_CHECKLIST.md'
)
foreach ($file in $files) {
    Copy-Item -LiteralPath (Join-Path $root $file) -Destination (Join-Path $stage $file) -Force
}

foreach ($directory in @('server', 'src', 'public', 'scripts', 'devpost', 'docs')) {
    Copy-Item -LiteralPath (Join-Path $root $directory) -Destination (Join-Path $stage $directory) -Recurse -Force
}
Remove-Item -LiteralPath (Join-Path $stage 'devpost\learner-profile.md') -Force -ErrorAction SilentlyContinue

$proof = Join-Path $stage 'test-assets\tripo-proof'
New-Item -ItemType Directory -Force -Path $proof | Out-Null
Copy-Item -Path (Join-Path $root 'test-assets\tripo-proof\*') -Destination $proof -Recurse -Force

$demoAssets = Join-Path $stage 'demo\assets'
New-Item -ItemType Directory -Force -Path $demoAssets | Out-Null
Copy-Item -Path (Join-Path $root 'demo\assets\*') -Destination $demoAssets -Force
Copy-Item -LiteralPath (Join-Path $root 'demo\manual-recording-runbook.md') -Destination (Join-Path $stage 'demo\manual-recording-runbook.md') -Force

$video = Join-Path $root 'demo\hairfit-demo-final.mp4'
Copy-Item -LiteralPath $video -Destination (Join-Path $submission 'HairFit-demo-final.mp4') -Force
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -CompressionLevel Optimal -Force

Get-ChildItem -LiteralPath $submission -File | Select-Object FullName, Length, LastWriteTime
Write-Output "Staged source: $stage"
Write-Output "Source zip: $zip"
