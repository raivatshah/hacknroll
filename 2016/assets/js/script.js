// modified from http://codepen.io/lukerichardville/pen/KdVqjv
var c = document.querySelector('canvas'),
        $ = c.getContext('2d'),
        w = c.width = c.getBoundingClientRect().width,
        h = c.height = c.getBoundingClientRect().height,
        lines = [],
        lineCount = 100;

var ox = 0, oy = 0;

var logo = document.querySelector(".logo");

function init() {
    stage();
    for (var i = 0; i < lineCount; i++)
        lines.push(new Line());
    loop();
}

function stage() {
    w = c.width = c.getBoundingClientRect().width;
    h = c.height = c.getBoundingClientRect().height;

    var rect = logo.getBoundingClientRect();
    var crect = c.getBoundingClientRect();
    ox = rect.left + rect.width / 2 - crect.left;
    oy = rect.top + rect.height / 2 -  crect.top;

}

function Line() {
    this.location = {
        x: Math.random() * w,
        y: Math.random() * h
    };
    this.location.x = ox;
    this.location.y = oy;
    this.width = Math.random() * 1 + 0.25;
    this.color = 'hsla('+~~(Math.random() * 360)+', 100%, 70%, 0.90)';
}

var step = 0;

function initLines() {
    lines.forEach(function(line) {
        line.location.x = Math.random() * w;
        line.location.y = Math.random() * h;
        line.location.x = ox;
        line.location.y = oy;
    });
}

function draw() {
    $.fillStyle = 'rgba(50, 50, 100, 0.028)';
    $.fillRect(0, 0, w, h);

    if (step >= 150) {
        step = 0;
        return;
    }

    step ++;
    if (step % 2 == 1) {
        return;
    }
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i],
                a = ~~(Math.random() * 3) * 90,
                lL = Math.random() * 15 + 5;
        lL *= 2;
        if (i % 4 === a / 90) {
            a = 270;
        }
        $.lineWidth = l.width;
        $.strokeStyle = l.color;
        $.beginPath();
        $.moveTo(l.location.x, l.location.y);
        switch(a) {
            case 0:
                l.location.y -= lL;
                break;
            case 90:
                l.location.x += lL;
                break;
            case 180:
                l.location.y += lL;
                break;
            case 270:
                l.location.x -= lL;
                break;
            default:
                break;
        }
        $.lineTo(l.location.x, l.location.y);
        if (l.location.x < 0 || l.location.x > w || l.location.y < 0 || l.location.y > h) {
            l.location.x = ox;
            l.location.y = oy;
        }
        $.stroke();
    }
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener('resize', function() {
    stage();
    initLines();
    step = 0;
});

init();

