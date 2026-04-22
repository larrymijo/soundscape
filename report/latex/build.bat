@echo off
REM LaTeX Report Build Script for Windows
REM Compiles the main.tex file into PDF

setlocal enabledelayedexpansion

echo Soundscape Fullstack Lab - LaTeX Report Builder
echo.

REM Check if pdflatex is available
where pdflatex >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: pdflatex not found in PATH
    echo Please install TeX Live or MiKTeX from:
    echo   - https://www.tug.org/texlive/
    echo   - https://miktex.org/
    echo.
    pause
    exit /b 1
)

REM Get script directory
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo Building PDF from main.tex...
echo.

REM First compilation (creates TOC structure)
pdflatex -interaction=nonstopmode main.tex >nul 2>&1
if %errorlevel% neq 0 (
    echo First pass failed. Running with output for debugging...
    pdflatex -interaction=nonstopmode main.tex
    pause
    exit /b 1
)

echo First pass completed successfully.

REM Second compilation (includes TOC)
pdflatex -interaction=nonstopmode main.tex >nul 2>&1
if %errorlevel% neq 0 (
    echo Second pass failed. Running with output for debugging...
    pdflatex -interaction=nonstopmode main.tex
    pause
    exit /b 1
)

echo Second pass completed successfully.

REM Check if PDF was created
if exist "main.pdf" (
    echo.
    echo ✓ PDF generated successfully: main.pdf
    echo.
    
    REM Optional: Open the PDF
    start main.pdf
    echo Opening PDF viewer...
) else (
    echo Error: PDF was not generated.
    echo Check the log file for details.
    pause
    exit /b 1
)

echo.
echo Build complete!
pause
