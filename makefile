JADEC = ./node_modules/.bin/jade
LESSC = lessc

JADE = $(wildcard views/*.jade)
HTML = $(JADE:.jade=.html)

LESS = $(wildcard public/css/*.less)
CSS = $(LESS:.less=.css)

# TARGET = /srv/http/

all: clean $(CSS) $(HTML)
	cp -r public/img static/img
	cp public/css/*.css static/css/
	# cp -r static/* $(TARGET)

%.css: %.less
	$(LESSC) $< > static/css/$(@F)

%.html: %.jade
	$(JADEC) < $< --path $< > static/$(@F)
	sed -i 's|href="/\([^/"]*\)"|href="/\1.html"|g' static/$(@F)

.PHONY: clean

clean:
	rm -rf static
	mkdir -p static/css
