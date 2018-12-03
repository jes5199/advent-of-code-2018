import fs = require('fs');
import readline = require('readline');

let freq = 0;
let freqsSeenBefore = {};
let cycle = 0;
let foundDuplicate = false;

function startReading() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('1.txt')
    });

    lineReader.on('line', function (line) {
        let change = parseInt(line);
        freq += change;
        //console.log([change, freq]);

        if(freq in freqsSeenBefore) {
            console.log("again we reached " + freq);
            foundDuplicate = true;
            freqsSeenBefore[freq] += 1;
        } else {
            freqsSeenBefore[freq] = 1;
        }
        //console.log(freqsSeenBefore);
    });

    lineReader.on('close', function () {
        console.log("cycle " + cycle + " ended at " + freq);
        cycle += 1;
        if(!foundDuplicate) { startReading(); }
    });
};

startReading();