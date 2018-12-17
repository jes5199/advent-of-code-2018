let initialState = ".#..##..#.....######.....#....####.##.#.#...#...##.#...###..####.##.##.####..######......#..##.##.##";

let transitions = {
    "#....": ".",
    ".##.#": "#",
    "#..##": ".",
    "....#": ".",
    "###.#": "#",
    "...#.": "#",
    "#...#": "#",
    "#.###": ".",
    ".#...": "#",
    "...##": ".",
    "..###": ".",
    "####.": ".",
    "##.##": ".",
    "..##.": ".",
    ".#.##": "#",
    "#..#.": "#",
    ".....": ".",
    "#.#..": ".",
    "##.#.": "#",
    ".####": "#",
    "#####": ".",
    "#.##.": "#",
    ".#..#": "#",
    "##...": ".",
    "..#.#": "#",
    "##..#": "#",
    ".###.": ".",
    ".#.#.": "#",
    "#.#.#": "#",
    "###..": ".",
    ".##..": ".",
    "..#..": ".",
};

let state = initialState;
let leftMost = 0;

const max = 50000000000;

for(let gen = 1; gen <= max; gen++) {
    let input = "...." + state + "....";

    let newState = "";
    for(let n = 0; n < input.length - 4; n++) {
        let section = input.slice(n, n+5);
        newState += transitions[section];
    }

    state = newState;
    leftMost -= 2;

    let match = state.match(/^\.*/);
    let leftBlanks = match[0].length;
    leftMost += leftBlanks;
    state = state.slice(leftBlanks);

    console.log(gen, leftMost, state);

    state = state.replace(/\.*$/, "");

    let score = 0;
    for(let i = 0; i < state.length; i++) {
        let n = i + leftMost;
        if(state[i] == "#") {
            score += n;
        }
    }

    console.log(score);

    console.log(gen - leftMost);

    let leftMostEstimate = max - (gen - leftMost);

    score = 0;
    for(let i = 0; i < state.length; i++) {
        let n = i + leftMostEstimate;
        if(state[i] == "#") {
            score += n;
        }
    }

    console.log(score);
}
