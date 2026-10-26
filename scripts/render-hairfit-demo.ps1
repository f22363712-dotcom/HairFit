$ErrorActionPreference = 'Stop'
$source = 'C:\Users\20651\Videos\屏幕录制\2026-10-27 04-38-22.mp4'
$output = Join-Path (Split-Path $PSScriptRoot -Parent) 'demo\hairfit-demo-final.mp4'
Remove-Item -LiteralPath $output -Force -ErrorAction SilentlyContinue

$filter = @"
[0:v]trim=start=0:end=6,setpts=PTS-STARTPTS[v0];
[0:a]atrim=start=0:end=6,asetpts=PTS-STARTPTS[a0];
[0:v]trim=start=50:end=64,setpts=PTS-STARTPTS[v1];
[0:a]atrim=start=50:end=64,asetpts=PTS-STARTPTS[a1];
[0:v]trim=start=65:end=73,setpts=PTS-STARTPTS[v2];
[0:a]atrim=start=65:end=73,asetpts=PTS-STARTPTS[a2];
[0:v]trim=start=104:end=114,setpts=PTS-STARTPTS[v3];
[0:a]atrim=start=104:end=114,asetpts=PTS-STARTPTS[a3];
[0:v]trim=start=118:end=128,setpts=PTS-STARTPTS[v4];
[0:a]atrim=start=118:end=128,asetpts=PTS-STARTPTS[a4];
[0:v]trim=start=240:end=288,setpts=PTS-STARTPTS[v5];
[0:a]atrim=start=240:end=288,asetpts=PTS-STARTPTS[a5];
[0:v]trim=start=300:end=325.33,setpts=PTS-STARTPTS[v6];
[0:a]atrim=start=300:end=325.33,asetpts=PTS-STARTPTS[a6];
[v0][a0][v1][a1][v2][a2][v3][a3][v4][a4][v5][a5][v6][a6]concat=n=7:v=1:a=1[v][a]
"@ -replace "`r?`n", ''

& ffmpeg -y -i $source -filter_complex $filter -map '[v]' -map '[a]' -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart $output
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed with exit code $LASTEXITCODE" }
& ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1:nokey=0 $output
Write-Output "Rendered $output"
