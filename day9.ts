import fs = require('fs');

const playerCount = 476;
const lastMarble = 71431 * 100;

let marbles = [0];
let nextMarble = 0;
let currentMarble = 0;
let currentPlayer = 0;


let scores : number[] = Array(playerCount).fill(0);

while((nextMarble += 1) <= lastMarble) {
    if(nextMarble % 10000 == 0) {
        console.log(nextMarble);
    }
    currentPlayer += 1;
    currentPlayer = currentPlayer % playerCount;
    
    if(nextMarble % 23) {
        currentMarble = ((currentMarble + 1) % marbles.length) + 1;
        marbles.splice(currentMarble, 0, nextMarble);
    } else {
        scores[currentPlayer] += nextMarble;
        currentMarble = (currentMarble - 7 + marbles.length) % marbles.length;
        let takenMarble = marbles.splice(currentMarble, 1)[0];
        //console.log("took #" + takenMarble);
        scores[currentPlayer] += takenMarble;
    }
    //console.log(marbles);
}
console.log(scores);
console.log(scores.sort()[scores.length-1]);