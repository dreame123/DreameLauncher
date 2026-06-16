@echo off
setlocal

cd /d "%~dp0"

echo.
echo Dreame Launcher EXE Builder
echo ==========================
echo.

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo npm was not found.
  echo Trying to install Node.js LTS, which includes npm...
  where winget >nul 2>nul
  if errorlevel 1 (
    echo.
    echo Could not find winget. Install Node.js LTS from https://nodejs.org/ and run this file again.
    pause
    exit /b 1
  )
  winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
  if errorlevel 1 (
    echo.
    echo Node.js install failed. Install Node.js LTS from https://nodejs.org/ and run this file again.
    pause
    exit /b 1
  )
  set "PATH=%ProgramFiles%\nodejs;%AppData%\npm;%PATH%"
)

echo Installing launcher packages...
call npm.cmd install
if errorlevel 1 (
  echo.
  echo npm install failed.
  pause
  exit /b 1
)

echo.
echo Making sure Electron is ready...
call npm.cmd run fix:electron
if errorlevel 1 (
  echo.
  echo Electron repair failed.
  pause
  exit /b 1
)

echo.
echo Building Windows installer...
set CSC_IDENTITY_AUTO_DISCOVERY=false
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo Build failed.
  pause
  exit /b 1
)

echo.
echo Done. Your EXE installer is in the dist folder.
echo.
pause
