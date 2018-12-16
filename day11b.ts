
let input = 2187;

function powerLevel(x,y) {
    //Find the fuel cell's rack ID, which is its X coordinate plus 10.
    let rack = x + 10;
    // Begin with a power level of the rack ID times the Y coordinate.
    let power = rack * y; 
    //Increase the power level by the value of the grid serial number (your puzzle input).
    power += input;
    // Set the power level to itself multiplied by the rack ID.
    power *= rack;
    //Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
    power = Math.floor((power / 100) % 10);
    //Subtract 5 from the power level.
    return power - 5;
}

let bestScore = 0;
let coords = [];

for(let size = 1; size<= 300; size++) {
    //console.log(size);
    for(let y = 1; y <= (300-size+1); y++) {
        for(let x = 1; x <= (300-size+1); x++) {
            let score = 0;
            for(let dx = 0; dx<size; dx++) {
                for(let dy = 0; dy<size; dy++) {
                    score += powerLevel(x+dx, y+dy);
                }
            }
            if(score > bestScore) {
                bestScore = score;
                coords = [x,y, size];
                console.log(coords);
            }
        }
    }
}

console.log(coords);
