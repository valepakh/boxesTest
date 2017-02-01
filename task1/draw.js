function drawBins(bins) {
    var drawArea = document.getElementById('drawArea');
    while (drawArea.firstChild) {
        drawArea.removeChild(drawArea.firstChild);
    }
    for (var i = 0; i < bins.length; i++) {
        var bin = bins[i];
        var div = document.createElement('div');
        var canvas = document.createElement('canvas');
        canvas.id = "bin"+i;
        canvas.width = bin.w;
        canvas.height = bin.h;
        div.appendChild(canvas);
        drawArea.appendChild(div);
        drawRects(canvas, bin.rects);
    }
}

function drawRects(canvas, rects) {
    document.getElementById('log').innerHTML = "";
    //logRects(rects);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }

    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        ctx.fillStyle = getColor(i);
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
}

function getRandomRects(isSquare) {
    var max = binWidth/4;
    var res = new Array(100);
    for (var i = 0; i < res.length; i++) {
        var w = getRnd(16, max);
        var h = isSquare ? w : getRnd(16, max);
        res[i] = { id: "r"+i, w: w, h: h };
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

function logRects(rects) {
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        var data = r.id + "=(" + r.x + ", " + r.y + "), [" + r.w + ", " + r.h + "]";
        //document.getElementById('log').innerHTML += data + "<br>";
        console.log(data);
    }
    console.log("");
}
