import fs = require("fs");
import readline = require("readline");

let coords = [];
let minX, minY, maxX, maxY;
const maximumScore = 10000;

function startReading() {
  let lineReader = readline.createInterface({
    input: fs.createReadStream("6.txt")
  });

  lineReader.on("line", function(line) {
    const pattern = /(\d+), (\d+)/;
    let match = line.match(pattern);
    let x = parseInt(match[1]);
    let y = parseInt(match[2]);
    coords.push([x, y]);

    if(minX === undefined || x < minX) {
      minX = x;
    }
        
    if(minY === undefined || y < minY) {
      minY = y;
    }

    if(maxX === undefined || x > maxX) {
      maxX = x;
    }
        
    if(maxY === undefined || y > maxY) {
      maxY = y;
    }
  });

  lineReader.on("close", function() {
    search();
  });
}

function search() {
  let safe = 0;
  let padding = 1;
  for(let y = minY - padding; y<=maxY + padding; y++) {
    for(let x = minX - padding; x<= maxX + padding; x++) {
      let score = 0;
      coords.forEach((coord) => {
        let dist = Math.abs(x - coord[0]) + Math.abs(y - coord[1]);
        score += dist;
      });
      if(score < maximumScore) {
        safe += 1;
      }
    }
  }
  console.log(safe);
}

startReading()