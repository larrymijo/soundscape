# Makefile for LaTeX Report Compilation
# Usage: make, make clean, make view

LATEX = pdflatex
LATEXFLAGS = -interaction=nonstopmode
MAIN = main
OUTPUT = $(MAIN).pdf
BUILDDIR = build

.PHONY: all clean view help

all: $(OUTPUT)

$(OUTPUT): $(MAIN).tex
	@echo "Building PDF from $(MAIN).tex..."
	@echo "First pass: Creating table of contents..."
	$(LATEX) $(LATEXFLAGS) $(MAIN).tex > /dev/null 2>&1
	@echo "Second pass: Finalizing document..."
	$(LATEX) $(LATEXFLAGS) $(MAIN).tex > /dev/null 2>&1
	@echo "✓ PDF generated successfully: $(OUTPUT)"

view: $(OUTPUT)
	@echo "Opening $(OUTPUT)..."
	@if command -v xdg-open > /dev/null; then \
		xdg-open $(OUTPUT); \
	elif command -v open > /dev/null; then \
		open $(OUTPUT); \
	else \
		echo "Please open $(OUTPUT) with your PDF viewer"; \
	fi

clean:
	@echo "Cleaning build artifacts..."
	rm -f $(MAIN).aux $(MAIN).log $(MAIN).out $(MAIN).toc
	rm -f $(MAIN).fls $(MAIN).fdb_latexmk $(MAIN).synctex.gz
	@echo "Clean complete."

distclean: clean
	@echo "Removing generated PDF..."
	rm -f $(OUTPUT)
	@echo "Distribution clean complete."

help:
	@echo "Soundscape LaTeX Report - Build Targets"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  all       - Build the PDF (default)"
	@echo "  view      - Build and open PDF in viewer"
	@echo "  clean     - Remove build artifacts (.aux, .log, etc.)"
	@echo "  distclean - Remove all generated files including PDF"
	@echo "  help      - Show this help message"
	@echo ""
	@echo "Examples:"
	@echo "  make          # Build PDF"
	@echo "  make view     # Build and open PDF"
	@echo "  make clean    # Clean up build files"
