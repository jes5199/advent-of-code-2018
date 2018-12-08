import fs = require("fs");
import readline = require("readline");
import { EFAULT } from "constants";

let graph = {};
let answer = [];
let available = [];

let workers = [null, null, null, null, null];
let time = 0;

function duration(n: string) {
    return (n.charCodeAt(0) - "A".charCodeAt(0) + 1 + 60);
}

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

    while(available.length || workers.find(x => x) ) {
        // clear out any workers who are finished
        for(let elf = 0; elf < workers.length; elf++) {
            if(workers[elf] && workers[elf][1] <= time) {
                let n = workers[elf][0];
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
                workers[elf] = null;
                console.log(workers);
            }
        }

        // assign work to any workers who are available
        let elf = workers.indexOf(null);
        while(elf != -1 && available.length > 0) {
            let n = available.shift();
            workers[elf] = [n, duration(n) + time];
            console.log(workers);
            elf = workers.indexOf(null);
        }

        time += 1;
        //console.log(time);
    }
    
    console.log(workers);
  });
};

startReading();