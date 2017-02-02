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
    var res = [];
    pushBoxes(res, [
        {x0: 0, x1: 30, h: 100},
        {x0: 20, x1: 40, h: 150},
        {x0: 40, x1: 60, h: 80},
    ]);

    pushBoxes(res, [
        {x0: 0, x1: 20, h: 100},
        {x0: 20, x1: 40, h: 150},
        {x0: 40, x1: 60, h: 110},
    ]);

    pushBoxes(res, [
        {x0: 0, x1: 20, h: 100},
        {x0: 0, x1: 40, h: 130},
        {x0: 0, x1: 60, h: 160},
    ]);

    pushBoxes(res, [
        {x0: 0, x1: 60, h: 100},
        {x0: 20, x1: 60, h: 140},
        {x0: 40, x1: 60, h: 180},
    ]);

    pushBoxes(res, [
        {x0: 20, x1: 80, h: 180},
        {x0: 40, x1: 60, h: 160},
        {x0: 0, x1: 100, h: 200},
    ]);

    pushBoxes(res, [
        {x0: 0, x1: 60, h: 150},
        {x0: 20, x1: 40, h: 200},
        {x0: 30, x1: 80, h: 100},
    ]);

    pushBoxes(res, [
        {x0: 0, x1: 20, h: 100},
        {x0: 20, x1: 40, h: 100},
    ]);

    for (var i = 0; i < res.length; i++) {
        res[i].clr = getColor(i);
    }
    return res;
}

function pushBoxes(res, group) {
    var lastX = res.length > 0 ? res[res.length-1].x1 : 0;
    lastX += 20;
    for (var i = 0; i < group.length; i++) {
        var b = group[i];
        res.push({ x0: lastX + b.x0, x1: lastX + b.x1, h: b.h });
    }
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
