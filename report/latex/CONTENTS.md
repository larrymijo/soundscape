# Soundscape Fullstack Lab Report

A comprehensive LaTeX report for the DA219B Fullstack Lab covering the complete Soundscape application.

## 📋 Report Structure

### 1. System Overview
- **Length:** 5-8 lines describing the application
- **Content:** Soundscape's purpose, tech stack, and problem it solves
- **Covers:** Real-time collaborative music synchronization for remote listeners

### 2. Database Design
- **Entity Relationship Diagram (ERD):** TikZ-generated visual showing:
  - Song collection with music metadata
  - Room collection with playback state
  - Queue collection with song ordering
  - All relationships with ObjectId references
  
- **Collections Documentation:**
  - **Songs:** title, artist, BPM (custom), duration (custom), genre (custom), coverColor
  - **Rooms:** name, createdAt, listenerCount, currentSongId (ref), playbackPosition (custom), isPlaying
  - **Queues:** roomId (ref), songs array with songId (ref), addedAt (custom), votes (custom)

- **Validation Details:** All constraints, required fields, min/max values
- **Seed Data:** 7 realistic songs, 3 thematic rooms, realistic relationships

### 3. API Endpoints (2 Detailed Examples)

#### Endpoint 1: GET /api/rooms/:id
- Full HTTP request/response examples
- Error responses (404, 500)
- Complete implementation flow with 5 steps
- Source code from actual controller
- Shows population of related data

#### Endpoint 2: POST /api/rooms/:roomId/queue
- Request body with validation
- Success response with populated queue
- Multiple error scenarios with specific messages
- 8-step implementation flow
- Input validation, format checking, business logic, error handling
- Source code from actual controller

### 4. Reflection Section
- **Challenge:** Real-time synchronization across multiple clients
- **Initial Problem:** REST polling limitations (latency, overhead, UX)
- **Solution:** WebSocket via Socket.IO for bidirectional communication
- **Implementation Details:** Event-driven architecture, room namespacing
- **Learning Outcome:** CAP theorem, eventual consistency, distributed systems design

### 5. Feature Iteration
- **Feature:** Queue Entry Management System
- **Initial State:** Flat song references without metadata (Commit 3a7f2e1)
- **Problems:** No timestamps, voting, metadata tracking
- **Improved State:** Embedded documents with addedAt and votes (Commit 8b9c4d7)
- **Benefits:** Atomic operations, temporal ordering, democratic features

### 6. Compliance Checklist
Verification against all DA219B lab requirements:
- ✓ Project Setup (Vite, Express, MongoDB Atlas, .env, concurrently, README)
- ✓ Application Design (Original domain, realistic data, custom fields, problem statement)
- ✓ Database (3 collections, 5+ documents, relationships, ERD, validation)
- ✓ Backend API (Full CRUD, relational endpoints, custom endpoints, error handling, architecture, validation)
- ✓ Frontend (Display, forms, CRUD UI, sorting, auto-refresh, custom features, components, loading states)
- ✓ Git Requirements (10+ commits, conventional messages, iteration history)

### 7. Appendix
- Setup commands for one-command startup
- Environment variable examples
- Project statistics table
- Resource links

## 📦 Files Included

| File | Purpose |
|------|---------|
| `main.tex` | Complete LaTeX report source |
| `README.md` | Compilation and usage guide |
| `build.bat` | Windows batch script for PDF generation |
| `build.ps1` | Windows PowerShell script for PDF generation |
| `Makefile` | Unix/Linux/macOS build automation |
| `.gitignore` | Git configuration for build artifacts |
| `CONTENTS.md` | This file - detailed report overview |

## 🚀 Quick Start

### Windows (Batch Script)
```bash
cd report/latex
build.bat
```

### Windows (PowerShell)
```bash
cd report/latex
powershell -ExecutionPolicy Bypass -File build.ps1
```

### Linux/macOS
```bash
cd report/latex
make view
```

### Manual Compilation
```bash
cd report/latex
pdflatex main.tex
pdflatex main.tex
```

## 📊 Report Specifications

| Aspect | Details |
|--------|---------|
| **Document Class** | article (11pt, A4) |
| **Total Sections** | 7 main sections + appendix |
| **Code Examples** | 8+ code listings with syntax highlighting |
| **Diagrams** | 1 ERD (TikZ), 1 relationship table |
| **Tables** | 2 structured tables |
| **Page Orientation** | Portrait |
| **Margins** | 1 inch all sides |
| **Line Spacing** | Default (1.0) |

## 🎨 Formatting Features

- **Syntax Highlighting:** Python, JavaScript, JSON, Bash, SQL
- **Color Scheme:** Professional with green comments, purple keywords, blue strings
- **Headers/Footers:** "DA219B" on left, "Soundscape - Fullstack Lab" on right, page numbers
- **Typography:** Clear section hierarchy with bold titles and numbered subsections
- **Links:** Hyperref support for table of contents navigation

## ✅ Lab Requirements Coverage

**System Overview:** ✓ Clear 1-sentence problem statement
**Database:** ✓ ERD, 3 collections, 5+ docs, relationships, validation
**API:** ✓ 2 detailed endpoints with request/response/flow/code
**Reflection:** ✓ Challenge, solution, learning outcome
**Iteration:** ✓ Feature evolution with 2+ commit hashes
**All Others:** ✓ Complete compliance verification included

## 🔧 Customization

### Modify Content
Edit `main.tex` directly - all sections are clearly marked with comments

### Change Colors
Look for color definitions in preamble:
```latex
\definecolor{codegreen}{rgb}{0,0.6,0}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
```

### Adjust Margins
Modify the geometry package:
```latex
\geometry{margin=1in}  # Change to 0.5in, 1.5in, etc.
```

### Add/Remove Sections
Delete or add section blocks between major dividers:
```latex
% ============================================================================
% SECTION X: TITLE
% ============================================================================
```

## 📝 Git Integration

Recommended git workflow:
```bash
git add report/latex/main.tex
git commit -m "docs: add fullstack lab report"

# Don't commit build artifacts
git add report/latex/.gitignore
```

## 🐛 Troubleshooting

**"pdflatex not found"**
- Install TeX Live: https://www.tug.org/texlive/
- Or MiKTeX: https://miktex.org/

**PDF not generated**
- Check main.log for errors
- Ensure main.tex is in the current directory

**Table of contents missing**
- Run compilation twice (Makefile/build scripts do this automatically)

**Special characters rendering wrong**
- Ensure UTF-8 encoding is set in your editor

## 📚 Resources

- **TeX Live:** https://www.tug.org/texlive/
- **MiKTeX:** https://miktex.org/
- **Overleaf:** https://www.overleaf.com/
- **LaTeX Guide:** https://www.latex-project.org/help/documentation/

## 📌 Notes

- Report is approximately 12-15 pages when compiled
- Includes all required lab submission elements
- Professional formatting suitable for academic submission
- Can be easily extended with additional sections if needed
- All code examples are actual production code from the Soundscape application

## 🎯 Next Steps

1. ✓ Run `build.bat` or `make view` to generate PDF
2. ✓ Review generated PDF for completeness
3. ✓ Commit to git with appropriate message
4. ✓ Submit PDF as part of DA219B lab submission
5. ✓ Use as reference during seminar presentation

---

**Created:** 2024  
**For:** DA219B Fullstack Lab, Kristianstad University  
**Application:** Soundscape - Real-Time Collaborative Music Rooms
