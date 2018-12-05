import fs = require('fs');

let stream = fs.createReadStream('5.txt');

stream.on('readable', function() {
    var chunk;
    while (null !== stream.read(1)) {
        // this is silly
    }
  });

let shrunk = [];

let shrunkWithout = {};

let capitalized = "a".charCodeAt(0) ^ "A".charCodeAt(0);
function matches(a: number, b : number): Boolean {
    return ((a ^ b ^ capitalized) == 0);
}

function shrink(shrunk: number[], ch: number) {
    if(shrunk.length > 0 && matches(ch, shrunk[shrunk.length-1])){
        shrunk.pop();
    } else {
        shrunk.push(ch);
    }
}

stream.on('data', (chunk: Buffer) => {
    let ch = chunk[0];
    if(ch < 32) {
        return;
    }
    let kind: number = (ch | capitalized);
    if(! (String.fromCharCode(kind) in shrunkWithout)) {
        shrunkWithout[String.fromCharCode(kind)] = shrunk.map(x=>x);
    }

    shrink(shrunk, ch);
    for(let k in shrunkWithout) {
        if(k.charCodeAt(0) != kind) {
            shrink(shrunkWithout[k], ch);
        }
    }
    //console.log(shrunk.map(n => String.fromCharCode(n)).join(""));
});

stream.on("close", () => {
    console.log(shrunk.map(n => String.fromCharCode(n)).join(""));
    console.log(shrunk.length);
    for(let k in shrunkWithout) {
        console.log([k, shrunkWithout[k].length]);
        //console.log(shrunkWithout[k].map(n => String.fromCharCode(n)).join(""));
    }
})