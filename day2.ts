import fs = require('fs');
import readline = require('readline');

let cycle = 0;
let twosies = 0;
let threesies = 0;

function startReading() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('2.txt')
    });

    lineReader.on('line', function (line) {
        let counts = {};
        for(let n = 0; n < line.length; n++) {
            let letter = line.charAt(n);
            if(!(letter in counts)) {
                counts[letter] = 0;
            }
            counts[letter] += 1;
        }
        //console.log(counts);
        let countNumbers = Object.values(counts);
        if(countNumbers.includes(2)) {
            twosies += 1;
        }
        if(countNumbers.includes(3)) {
            threesies += 1;
        }
    });

    lineReader.on('close', function () {
        cycle += 1;
        console.log(twosies + " * " + threesies + " = " + (twosies * threesies));
        //if(false) { startReading(); }
    });
};

startReading();