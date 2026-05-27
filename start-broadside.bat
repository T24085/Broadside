@echo off
setlocal

set "ROOT=%~dp0"
set "URL=http://127.0.0.1:3000/"

echo Starting Broadside dev server...
start "Broadside Dev Server" /D "%ROOT%" cmd /k npm run dev

echo Waiting for http://127.0.0.1:3000/ ...
set /a ATTEMPTS=0
:wait_for_server
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -Uri '%URL%' -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  set /a ATTEMPTS+=1
  if %ATTEMPTS% GEQ 60 (
    echo Server did not respond after 2 minutes.
    exit /b 1
  )
  timeout /t 2 /nobreak >nul
  goto wait_for_server
)

echo Opening browser...
start "" "%URL%"

endlocal
