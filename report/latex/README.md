# LaTeX Report - Soundscape Fullstack Lab

This directory contains the LaTeX source code for the Soundscape project report.

## Files

- **main.tex** - Complete lab report with all required sections

## Compiling the Report

### Option 1: Using pdflatex (Command Line)

```bash
cd report/latex
pdflatex main.tex
pdflatex main.tex  # Run twice for table of contents
```

This generates `main.pdf`.

### Option 2: Using Overleaf (Online)

1. Go to https://www.overleaf.com
2. Create new project → Upload ZIP
3. Upload `main.tex` and any supporting files
4. Click "Recompile" to generate PDF

### Option 3: Using TeX Live (Windows)

If you have MiKTeX or TeX Live installed:

```bash
xelatex main.tex
xelatex main.tex
```

### Option 4: Using VS Code + LaTeX Workshop Extension

1. Install "LaTeX Workshop" extension in VS Code
2. Open main.tex
3. Press Ctrl+Alt+B to build
4. View PDF with Ctrl+Alt+V

## Requirements

The LaTeX document uses the following standard packages:
- `geometry` - Page margins
- `graphicx` - Image handling
- `hyperref` - Links and references
- `listings` - Code syntax highlighting
- `xcolor` - Colors
- `tikz` - ERD diagram
- `fancyhdr` - Headers and footers
- `titlesec` - Custom headings

All packages are part of standard TeX distributions.

## Output

Running compilation generates:
- `main.pdf` - Final report document
- `main.aux` - Auxiliary file
- `main.log` - Compilation log
- `main.out` - Bookmarks and links

## Report Contents

1. **System Overview** - Application description and tech stack
2. **Database Design** - ERD, collection schemas, relationships
3. **API Endpoints** - Detailed documentation of 2 key endpoints
4. **Reflection** - Development challenges and solutions
5. **Feature Iteration** - Evolution of queue system with git references
6. **Compliance** - Verification against lab requirements
7. **Appendix** - Setup commands and project statistics

## Customization

To modify the report:
- Edit `main.tex` directly
- Change section headings, add/remove content
- Update code listings with actual code snippets
- Modify colors in the preamble section
- Adjust page margins via `\geometry{}`

## Troubleshooting

**Error: Package not found**
- Run: `tlmgr update --all` (if using TeX Live)
- Or reinstall MiKTeX/TeX Live

**PDF not generated**
- Check `main.log` for error messages
- Ensure no special characters in file paths

**Missing images/diagrams**
- The ERD is generated via TikZ - no external images needed
- All diagrams are embedded in the LaTeX source

## Version Control

This report can be committed to git:
```bash
git add report/latex/main.tex
git commit -m "docs: add fullstack lab report"
```

Only commit `.tex` files, not generated `.pdf`, `.aux`, or `.log` files.
