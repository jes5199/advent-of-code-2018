import fs = require('fs');
import { stringify } from 'querystring';

let points: {x: number, y:number, dx: number, dy: number}[] = [];
let turn = 0;

fs.readFile("10.txt", 'utf8', function(err, data) {
    data.split("\n").map((line) => parseLine(line));
    //console.log(points);
    let done = false;

    while(true) {
        turn += 1;
        let size = iterate();
        console.log(["turn", turn, size]);
        if(size[0] < 500 && size[1] < 500) {
            showPoints();
            done = true;
        } else if(done) {
            throw "okay?";
        }
    }
});

function parseLine(line) {
    if(line == "") { return; }
    let match = line.match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s+(-?\d+)>/);
    if(!match) {
        console.log(JSON.stringify([line]));
    }
    let point = {
        x: parseInt(match[1]),
        y: parseInt(match[2]),
        dx: parseInt(match[3]),
        dy: parseInt(match[4])
    };
    points.push(point);

}

function iterate() {
    let [minx, miny, maxx, maxy] = [points[0].x, points[0].y, points[0].x, points[0].y];
    points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;
        if(point.x < minx) {minx = point.x;}
        if(point.x > maxx) {maxx = point.x;}
        if(point.y < miny) {miny = point.y;}
        if(point.y > maxy) {maxy = point.y;}
    });
    return [maxx - minx, maxy - miny];
}

function showPoints() {
    let [minx, miny, maxx, maxy] = [points[0].x, points[0].y, points[0].x, points[0].y];
    points.forEach(point => {
        if(point.x < minx) {minx = point.x;}
        if(point.x > maxx) {maxx = point.x;}
        if(point.y < miny) {miny = point.y;}
        if(point.y > maxy) {maxy = point.y;}
    });
    let grid: string[] = [];

    for(let y = miny; y<=maxy; y++) {
        grid.push("");

        for(let x = minx; x<=maxx; x++) {
            grid[grid.length-1] += " ";
        }
    }

    console.log([miny, maxy, grid.length]);
    console.log([minx, maxx, grid[0].length]);

    points.forEach(point => {
        let line = grid[point.y - miny];
        let x = point.x - minx;
        line = line.slice(0,x) + "*" + line.slice(x+1);
        grid[point.y - miny] = line;
    });

    grid.forEach(line => {
        console.log(line);
    });
}


