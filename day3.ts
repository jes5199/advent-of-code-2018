import fs = require('fs');
import readline = require('readline');

let fabric = [];

function startReading() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('3.txt')
    });

    lineReader.on('line', function (line) {
        const pattern = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
        let match = line.match(pattern);
        //console.log(match);
        let id = match[1];
        let x = parseInt(match[2]);
        let y = parseInt(match[3]);
        let w = parseInt(match[4]);
        let h = parseInt(match[5]);
        while(fabric.length < y + h) {
            fabric.push([]);
        }
        for(let a = y; a < y + h; a++) {
            while(fabric[a].length < x + w) {
                fabric[a].push(0);
            }
            for(let b = x; b < x + w; b++) {
                fabric[a][b] += 1;
            }
        }
    });

    lineReader.on('close', function () {
        //if(false) { startReading(); }
        let dupes = 0;
        for(let a = 0; a < fabric.length; a++) {
            let s = "";
            for(let b = 0; b < fabric[a].length; b++) {
                s += fabric[a][b] + " ";
                if(fabric[a][b] >= 2) {
                    dupes += 1;
                }
            }
            console.log(s);
        }
        console.log(dupes);
        readAgain();
    });
};

function readAgain() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('3.txt')
    });

    lineReader.on('line', function (line) {
        const pattern = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
        let match = line.match(pattern);
        //console.log(match);
        let id = match[1];
        let x = parseInt(match[2]);
        let y = parseInt(match[3]);
        let w = parseInt(match[4]);
        let h = parseInt(match[5]);

        let candidate = true;
        for(let a = y; a < y + h; a++) {
            for(let b = x; b < x + w; b++) {
                if(fabric[a][b] != 1) {
                    candidate = false;
                }
            }
        }
        if(candidate) {
            console.log(match);
        }
    });
};

startReading();