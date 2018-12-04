import fs = require('fs');
import readline = require('readline');

let lines = [];

function startReading() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('2.txt')
    });

    lineReader.on('line', function (line) {
        lines.forEach((oldLine) => {
            let n = 0;
            let output = "";
            for(let i = 0; i < line.length; i++) {
                if(line[i] != oldLine[i]) {
                    n += 1;
                } else {
                    output += line[i];
                }
            }
            if(n == 1) {
                console.log([line, oldLine, output]);
            }
        });
        lines.push(line);
    });

    lineReader.on('close', function () {
        //if(false) { startReading(); }
    });
};

startReading();