import fs = require("fs");
import readline = require("readline");

let graph = {};
let answer = [];
let available = [];

function startReading() {
  let lineReader = readline.createInterface({
    input: fs.createReadStream("7.txt")
  });

  lineReader.on("line", function(line) {
    let match = line.match(/Step (.).*step (.)/);
    let a = match[1];
    let b = match[2];
    if(!graph[b]) {
        graph[b] = [];
    }
    if(!graph[a]) {
        graph[a] = [];
    }
    graph[b].push(a);
  });

  lineReader.on("close", function() {
      console.log(graph);
    for(let a in graph) {
        if(graph[a].length == 0){
            available.push(a);
        }
    }
    available.sort();

    while(available.length) {
        let n = available.shift();
        answer.push(n);

        for(let a in graph) {
            let l: string[] = graph[a];
            let x = l.indexOf(n);
            if(x != -1) {
                l.splice(x, 1);
                if(l.length == 0){
                    available.push(a);
                    available.sort();
                }
            }
        }
    }
    
    console.log(answer.join(""));
  });
};

startReading();