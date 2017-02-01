var binWidth = 256;
var binHeight = 256;

function draw(sizes) {
    var bins = pack(sizes, binWidth, binHeight);
    drawBins(bins);
}

function pack(src, maxWidth, maxHeight) {
    var bins = [];
    console.log("src.length = " + src.length);
    var w = maxWidth;
    var h = maxHeight;
    var bestRes = undefined;
    while (src.length > 0) {
        var srcCopy = src.slice();
        var srcLen = srcCopy.length;
        var res = packBin(srcCopy, w, h);
        console.log("packed " + res.length + " from " + srcLen + " into " + w + "x" + h);
        if (srcCopy.length == 0) { // packed fully, try to minimize
            console.log("packed fully into " + w + "x" + h);
            bestRes = { w: w, h: w, rects: res };
            w >>= 1;
            h >>= 1;
            console.log("trying " + w + "x" + h);
        } else if (bestRes != undefined) { // can't pack fully anymore, get best result
            console.log("left " + srcCopy.length);
            console.log("selecting best result " + bestRes.w + "x" + bestRes.h);
            bins.push(bestRes);
            return bins;
        } else {
            bins.push({ w: w, h: w, rects: res});
            console.log("left " + srcCopy.length);
            src = srcCopy;
        }
    }
    return bins;
}

function packBin(src, binWidth, binHeight) {
    var freeRects = [ {x: 0, y: 0, w: binWidth, h: binHeight} ];
    var usedRects = [];
    var res = [];
    var bestFreeRect;
    var bestSrcRect;
    //throw "";
    while (src.length > 0) {
        var min = Number.MAX_SAFE_INTEGER;
        for (var i = 0; i < freeRects.length; i++) {
            var f = freeRects[i];
            for (var j = 0; j < src.length; j++) {
                var s = src[j];
                //if (s.w == f.w && s.h == f.h) {}
                if (s.w <= f.w && s.h <= f.h) {
                    var cur = Math.min(f.w - s.w, f.h - s.h);
                    if (cur < min) {
                        min = cur;
                        bestFreeRect = i;
                        bestSrcRect = j;
                    }
                }
            }
        }
        if (min == Number.MAX_SAFE_INTEGER) {
            return res;
        }
        //console.log("bfr = " + bestFreeRect + ", bsr = " + bestSrcRect);
        var bfr = freeRects[bestFreeRect];
        var bsr = src[bestSrcRect];
        var newRect = { x: bfr.x, y: bfr.y,
            w: bsr.w, h: bsr.h };
        res.push(newRect);
        split(freeRects, bfr, bsr);
        freeRects.splice(bestFreeRect, 1);
        src.splice(bestSrcRect, 1);
    }
    return res;
}

function split(freeRects, f, r) {
    var w = f.w - r.w;
    var h = f.h - r.h;
    if (w < h) { // split horizontal
        freeRects.push({ x: f.x + r.w, y: f.y, w: w, h: r.h });
        freeRects.push({ x: f.x, y: f.y + r.h, w: f.w, h: h });
    } else { // vertical
        freeRects.push({ x: f.x + r.w, y: f.y, w: w, h: f.h });
        freeRects.push({ x: f.x, y: f.y + r.h, w: r.w, h: h });
    }
}
