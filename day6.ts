import fs = require("fs");
import readline = require("readline");

let coords = [];
let world = [];
let minX, minY, maxX, maxY;

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
    floodFill();
  });
}

function makeSheet() {
  let sheet = [];
  for(let y = minY; y<=maxY; y+=1) {
    let row = [];
    for(let x = minX; x<=maxX; x+=1) {
      row.push(null);
    }
    sheet.push(row);
  }
  return sheet;
}

function floodFill() {
  console.log([minX,minY, maxX, maxY]);
  world = makeSheet();
  coords.forEach((coord, id) => {
    world[coord[1] - minY][coord[0] - minX] = id + 1;
  });
  let sheet = makeSheet();

  let cycle = 0;
  let anyMarks = true;

  while(anyMarks) {
    anyMarks = false;
    cycle += 1;
    console.log("cycle " + cycle);
    // for every non-null mark on world, mark the null neighbors on sheet
    // but look out for and mark collisions on sheet!
    for(let y = 0; y<world.length; y+=1) {
      for(let x = 0; x<world[y].length; x+=1) {
        if(world[y][x] > 0) {
          // check each cardinal direction
          let directions = [ [x-1, y], [x+1, y], [x, y-1], [x, y+1] ];
          directions.forEach(pair => {
            let [tx, ty] = pair;
            if(tx < 0 || ty < 0 || ty >= world.length || tx >= world[ty].length) {
              return;
            }
            if(sheet[ty][tx] && sheet[ty][tx] != world[y][x]) { // collision!
              sheet[ty][tx] = -1;
            } else {
              sheet[ty][tx] = world[y][x];
            }
          });
        }
      }
    }
    for(let y = 0; y<world.length; y+=1) {
      for(let x = 0; x<world[y].length; x+=1) {
        if(sheet[y][x] && !world[y][x]) {
          world[y][x] = sheet[y][x];
          anyMarks = true;
        }
      }
    }
  }

  let infinites = [];
  let setInfinite = function(x,y) {
    let val = world[y][x];
    if(val > 0 && infinites.indexOf(val) == -1) {
      infinites.push(val);
    }
  }

  for(let y = 0; y<world.length; y+=1) {
    setInfinite(0, y);
    setInfinite(world[y].length-1, y);
  }
  for(let x = 0; x<world[0].length; x+=1) {
    setInfinite(x, 0);
    setInfinite(x, world.length-1);
  }
  console.log(infinites);

  let scores = {};

  for(let y = 0; y<world.length; y+=1) {
    for(let x = 0; x<world[y].length; x+=1) {
      let val = world[y][x];
      if(val > 0 && infinites.indexOf(val) == -1) {
        if(!scores[val]) {
          scores[val] = 0;
        }
        scores[val] += 1;
      }
    }
  }
  console.log(scores);
  console.log(Object.values(scores).sort());
}

startReading();
