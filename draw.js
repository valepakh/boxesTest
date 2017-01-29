var canvas;
var ctx;
var horZero;

function drawAll(boxes, points) {
    document.getElementById('log').innerHTML = "";
    logBoxes(boxes);
    logPoints(points);

    canvas = document.getElementById('drawArea');
    h = canvas.height;
    horZero = h - Math.floor(h/20);
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoxes(ctx, boxes);
    drawLine(ctx, points);
}

function drawBoxes(ctx, boxes) {
    for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        ctx.fillStyle = b.clr;
        ctx.fillRect(b.x0, horZero - b.h, b.x1 - b.x0, b.h);
    }
}

function drawLine(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, horZero - points[0].y);
    for (var i = 1; i < points.length; i++) {
        var x = points[i].x;
        var y = horZero - points[i].y;
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    for (var i = 0; i < points.length; i++) {
        var x = points[i].x;
        var y = horZero - points[i].y;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}

function getRandomBoxes() {
    var w = canvas.width;
    var h = canvas.height;
    var xmin = Math.floor(w/20);
    var xmax = w - xmin;
    var ymin = Math.floor(h/20);
    var ymax = h - ymin*2; // + offset for horZero
    var cnt = Math.floor(w/20);
    var res = new Array(10);
    for (var i = 0; i < res.length; i++) {
        var x0 = getRnd(xmin, xmax);
        var x1 = x0 + getRnd(10, 100);
        if (x1 > xmax) {
            var d = x1 - xmax;
            x0 -= d; x1 -= d;
        }
        res[i] = { x0: x0, x1: x1, h: getRnd(ymin, ymax), clr: getColor(i) };
    }
    return res;
}

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getColor(idx) {
    var l = (idx % 12) < 6 ? 255 : 127;
    var i = (idx) % 6 + 1;
    var a = 0.5;
    var r = ((i & 4) >> 2) * l;
    var g = ((i & 2) >> 1) * l;
    var b = (i & 1) * l;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function getSampleBoxes() {
    var res = [
        {x0: 30, x1: 60, h: 100},
        {x0: 50, x1: 70, h: 150},
        {x0: 70, x1: 90, h: 80},

        {x0: 110, x1: 130, h: 100},
        {x0: 130, x1: 150, h: 150},
        {x0: 150, x1: 170, h: 110},

        {x0: 190, x1: 210, h: 100},
        {x0: 190, x1: 230, h: 130},
        {x0: 190, x1: 250, h: 160},

        {x0: 270, x1: 330, h: 100},
        {x0: 290, x1: 330, h: 140},
        {x0: 310, x1: 330, h: 180},

        {x0: 350, x1: 450, h: 200},
        {x0: 370, x1: 430, h: 180},
        {x0: 390, x1: 410, h: 160},

        {x0: 470, x1: 530, h: 150},
        {x0: 490, x1: 510, h: 200},
        {x0: 500, x1: 550, h: 100},
    ];
    for (var i = 0; i < res.length; i++) {
        res[i].clr = getColor(i);
    }
    return res;
}

function logBoxes(boxes) {
    for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        var data = "b " + i + " [" + b.x0 + ", " + b.x1 + ", " + b.h + "]";
        //document.getElementById('log').innerHTML += data + "<br>";
        console.log(data);
    }
    console.log("");
}

function logPoints(points) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var data = "p " + i + " [" + p.x + ", " + p.y + "]";
        //document.getElementById('log').innerHTML += data + "<br>";
        console.log(data);
    }
    console.log("");
}
