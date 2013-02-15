JADEC = ./node_modules/.bin/jade
LESSC = lessc

JADE_DIR = views
JADE = $(wildcard $(JADE_DIR)/*.jade)
HTML_DIR = static
HTML = $(subst $(JADE_DIR)/,$(HTML_DIR)/,$(JADE:.jade=.html))

LESS_DIR = public/css
LESS = $(wildcard $(LESS_DIR)/*.less)
CSS_DIR = static/css
CSS = $(subst $(LESS_DIR)/,$(CSS_DIR)/,$(LESS:.less=.css))

# TARGET = /srv/http/

all: clean $(CSS) $(HTML)
	cp -r public/img static/img
	cp public/css/*.css static/css/
	# cp -r static/* $(TARGET)

$(CSS_DIR)/%.css: $(LESS_DIR)/%.less
	$(LESSC) $< > $@

$(HTML_DIR)/%.html: $(JADE_DIR)/%.jade
	$(JADEC) < $< --path $< > $@
	sed -i 's|href="/\([^/"]*\)"|href="/\1.html"|g' $@

.PHONY: clean

clean:
	rm -rf static
	mkdir -p $(CSS_DIR)
