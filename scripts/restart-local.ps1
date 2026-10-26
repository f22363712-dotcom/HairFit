param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'
$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$metadataPath = Join-Path $project 'logs/local-server-process.json'
$listener = @(Get-NetTCPConnection -LocalPort 8787 -State Listen -ErrorAction SilentlyContinue)
if ($listener.Count) {
  if (!(Test-Path -LiteralPath $metadataPath)) { throw 'Port8787 is occupied without project ownership metadata.' }
  $metadata = Get-Content -Raw -LiteralPath $metadataPath | ConvertFrom-Json
  $owned = Get-CimInstance Win32_Process -Filter "ProcessId=$($metadata.pid)"
  if ($metadata.workingDirectory -ne $project -or !$owned -or $owned.Name -ne 'node.exe' -or $owned.CommandLine -notmatch 'server[\\/]index.js' -or !($listener | Where-Object OwningProcess -eq $metadata.pid)) { throw 'Ownership mismatch; no process stopped.' }
  $processStart = (Get-Process -Id $metadata.pid).StartTime.ToUniversalTime()
  # ConvertFrom-Json may already return a UTC DateTime. Re-parsing its string loses the zone.
  $expectedStart = ([datetimeoffset]$metadata.startedAtUtc).UtcDateTime
  if ([Math]::Abs(($processStart - $expectedStart).TotalSeconds) -gt 15) { throw 'PID creation time mismatch; no process stopped.' }
  if ($CheckOnly) { Write-Output "Verified HairFit process $($metadata.pid); no process stopped."; return }
  Stop-Process -Id $metadata.pid
}
if ($CheckOnly) { Write-Output 'Port8787 has no listener; no process started.'; return }
Push-Location $project
try {
  & npm.cmd run build:mesh-worker
  if ($LASTEXITCODE -ne 0) { throw 'Worker build failed.' }
  $stamp = [datetime]::UtcNow.ToString('yyyyMMdd-HHmmss')
  $stdout = Join-Path $project "logs/local-server-$stamp.stdout.log"
  $stderr = Join-Path $project "logs/local-server-$stamp.stderr.log"
  $started = Start-Process -FilePath (Get-Command node.exe).Source -ArgumentList 'server/index.js' -WorkingDirectory $project -RedirectStandardOutput $stdout -RedirectStandardError $stderr -WindowStyle Hidden -PassThru
  [ordered]@{pid=$started.Id;startedAtUtc=[datetime]::UtcNow.ToString('o');workingDirectory=$project;listener='127.0.0.1:8787';stdout=$stdout;stderr=$stderr} | ConvertTo-Json | Set-Content -LiteralPath $metadataPath -Encoding utf8
  $healthy = $false
  for ($attempt=0; $attempt -lt 10; $attempt++) {
    Start-Sleep -Milliseconds 500
    try { $health = Invoke-RestMethod 'http://localhost:8787/api/health' -TimeoutSec 2; if ($health.ok) { $healthy=$true; break } } catch {}
  }
  if (!$healthy) { throw 'Server health did not pass; inspect the project logs.' }
  Write-Output "HairFit ready at http://localhost:8787/ (PID $($started.Id))"
} finally { Pop-Location }
