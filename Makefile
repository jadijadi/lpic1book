MARKDOWN = pandoc --from markdown_github --to html --standalone

.PHONY: html clean
html: $(patsubst %.md,%.html,$(wildcard *.md)) Makefile

clean:
	rm -f $(patsubst %.md,%.html,$(wildcard *.md))

%.html: %.md
	$(MARKDOWN) "$<" --output "$@"
