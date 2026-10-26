param(
  [string]$Output = "demo/hairfit-demo-$(Get-Date -Format 'yyyyMMdd-HHmmss').mkv",
  [int]$Seconds = 100
)
$ErrorActionPreference = 'Stop'
$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$ffmpeg = (Get-Command ffmpeg.exe -ErrorAction Stop).Source
$outputPath = Join-Path $project $Output
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $outputPath) | Out-Null
Write-Output "Recording the full desktop for $Seconds seconds. Open Edge on http://localhost:8787/ before running this command."
Write-Output "Output: $outputPath"
& $ffmpeg -y -f gdigrab -framerate 30 -draw_mouse 1 -i desktop -t $Seconds -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p $outputPath
if ($LASTEXITCODE -ne 0) { throw "ffmpeg recording failed with exit code $LASTEXITCODE" }
Write-Output "Recording saved: $outputPath"
