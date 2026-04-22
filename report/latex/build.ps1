# LaTeX Report Build Script for Windows PowerShell
# Compiles the main.tex file into PDF

Write-Host "Soundscape Fullstack Lab - LaTeX Report Builder" -ForegroundColor Cyan
Write-Host ""

# Check if pdflatex is available
$pdflatex = Get-Command pdflatex -ErrorAction SilentlyContinue
if (-not $pdflatex) {
    Write-Host "Error: pdflatex not found in PATH" -ForegroundColor Red
    Write-Host "Please install TeX Live or MiKTeX from:" -ForegroundColor Yellow
    Write-Host "  - https://www.tug.org/texlive/" 
    Write-Host "  - https://miktex.org/"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

Write-Host "Building PDF from main.tex..." -ForegroundColor Green
Write-Host ""

# First compilation (creates TOC structure)
Write-Host "First pass: Creating table of contents..." -ForegroundColor Gray
$firstResult = & pdflatex -interaction=nonstopmode main.tex 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "First pass failed. Running with output for debugging..." -ForegroundColor Red
    & pdflatex -interaction=nonstopmode main.tex
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "First pass completed successfully." -ForegroundColor Green

# Second compilation (includes TOC)
Write-Host "Second pass: Finalizing document..." -ForegroundColor Gray
$secondResult = & pdflatex -interaction=nonstopmode main.tex 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Second pass failed. Running with output for debugging..." -ForegroundColor Red
    & pdflatex -interaction=nonstopmode main.tex
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Second pass completed successfully." -ForegroundColor Green

# Check if PDF was created
if (Test-Path "main.pdf") {
    Write-Host ""
    Write-Host "✓ PDF generated successfully: main.pdf" -ForegroundColor Green
    Write-Host ""
    
    # Open the PDF
    Write-Host "Opening PDF viewer..." -ForegroundColor Gray
    Start-Process "main.pdf"
} else {
    Write-Host "Error: PDF was not generated." -ForegroundColor Red
    Write-Host "Check the log file for details."
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
Read-Host "Press Enter to exit"

Pop-Location
