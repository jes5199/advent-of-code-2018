import fs = require('fs');

let numbers;

fs.readFile("8.txt", 'utf8', function(err, data) {
    numbers = data.split(" ").map((s) => parseInt(s));
    let r = processAt(0);
    console.log(r);
});

function processAt(index) {
    let childCount = numbers[index];
    let metadataCount = numbers[index + 1];
    let value = 0;
    let childValue = [0];

    let newIndex = index + 2;
    let metaSum = 0;
    for(let ch = 0; ch < childCount ; ch++) {
        let r = processAt(newIndex);
        newIndex = r.newIndex;
        metaSum += r.metaSum;
        childValue.push(r.value);
    }
    //console.log(childValue);

    for(let m = 0; m < metadataCount; m++) {
        metaSum += numbers[newIndex];

        if(childCount == 0) {
            value += numbers[newIndex];
        } else {
            if(numbers[newIndex] < childValue.length) {
                value += childValue[numbers[newIndex]];
            }
        }

        newIndex += 1;
    }

    return {
        newIndex: newIndex,
        metaSum: metaSum,
        value: value
    }
}