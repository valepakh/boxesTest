function draw(boxes) {
    drawBoxes(boxes);

    var points = compute(boxes);
    drawAll(boxes, points);
}

var debug = true;

function addPoint(res, x, y) {
    if (debug) {
        if (res.length == 0) {
            ctx.beginPath();
            ctx.moveTo(x, horZero - y);
        } else {
            ctx.lineTo(x, horZero - y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, horZero - y);
        }
    }
    var p = { x: x, y: y };
    res.push(p);
    return p;
}

function compute(boxes) {
    var points = genPoints(boxes);
    var res = [];
    var curBoxes = []; // list of boxes sorted by height
    var cur = addPoint(res, points[0].x, 0);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if (p.type == 0) { // start
            addBox(curBoxes, p.b);
            if (p.y > cur.y) {
                if (p.x > cur.x) {
                    cur = addPoint(res, p.x, cur.y);
                }
                if (i < points.length-1 && points[i+1].x == cur.x) {
                    continue;
                }
                cur = addPoint(res, cur.x, p.y); // front up
            }
        } else { // end
            curBoxes.splice(bsearch(curBoxes, p.b), 1); // always found
            var lastH = curBoxes.length > 0 ? curBoxes[curBoxes.length-1].h : 0;
            if (lastH < cur.y) { // back down
                // skip identical points
                if (i < points.length-1 && points[i+1].x == p.x && points[i+1].y == p.y) {
                    continue;
                }
                if (p.x > cur.x) {
                    cur = addPoint(res, p.x, cur.y);
                }
                if (i < points.length-1 && points[i+1].x == cur.x) {
                    continue;
                }
                cur = addPoint(res, cur.x, lastH);
            }
        }
    }
    return res;
}

// returns the index of the box
// or the index where to insert it so the list is sorted by h
function bsearch(boxesList, b) {
    var low = 0;
    var high = boxesList.length - 1;
    var h = b.h;
    while (low <= high) {
        var mid = Math.floor((low + high)/2);
        var midH = boxesList[mid].h;
        if (midH < h) {
            low = mid + 1;
        } else if (midH > h) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -(low + 1);
}

function addBox(boxesList, b) {
    var idx = bsearch(boxesList, b);
    if (idx < 0) {
        idx = -idx - 1; // we always want to insert
    }
    boxesList.splice(idx, 0, b);
}

function genPoints(boxes) {
    points = [];
    for (var i = 0; i < boxes.length; i++) {
        var b = boxes[i]; // if (b.x0 < b.x1)...
        points.push({ x: b.x0, y: b.h, b: b, type: 0 });
        points.push({ x: b.x1, y: b.h, b: b, type: 1 });
    }
    return points.sort(function(a, b) {
        var res = a.x - b.x;
        return res != 0 ? res : a.y - b.y;
    });
}
