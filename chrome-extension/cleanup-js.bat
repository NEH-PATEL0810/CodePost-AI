@echo off
cd /d "%~dp0src"

echo === Removing accidentally generated .js files ===
del /s /q *.js

echo.
echo === Done! ===
