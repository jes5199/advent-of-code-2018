import fs = require('fs');

const playerCount = 476;
const lastMarble = 71431 * 100;

let nextMarble = 0;
let currentPlayer = 0;

let marble = {number: 0, next: null, prev: null};
marble.prev = marble;
marble.next = marble;

let scores : number[] = Array(playerCount).fill(0);

let firstMarble = marble;

while((nextMarble += 1) <= lastMarble) {
    if(nextMarble % 10000 == 0) {
        console.log(nextMarble);
    }
    currentPlayer += 1;
    currentPlayer = currentPlayer % playerCount;

    //let showMarble = marble;
    //let shows = [];
    //  for(let i = 0; i < nextMarble; i++) {
    //      shows.push(showMarble.number);
    //      showMarble = showMarble.next;
    //   }
    //   console.log(shows);
    
    if(nextMarble % 23) {
        //console.log(marble);
        marble = marble.next;
        let newMarble = {
            number: nextMarble,
            next: marble.next,
            prev: marble
        }
        //console.log(newMarble);
        marble.next = newMarble;
        marble = newMarble;
        marble.next.prev = marble;
    } else {
        scores[currentPlayer] += nextMarble;
        
        for(let n = 0; n < 7; n++) {
            marble = marble.prev;
        }
        scores[currentPlayer] += marble.number;
        //console.log(marble.number);
        marble.prev.next = marble.next;
        marble.next.prev = marble.prev;
        marble = marble.next;
    }
    //console.log(marbles);
}
console.log(scores);
console.log(scores.sort((a,b)=>(a-b))[scores.length-1]);