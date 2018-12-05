import fs = require('fs');
import readline = require('readline');

let sleepies = {};
let guard = 0;
let lastTime = Date.parse("1518-01-01");
let asleep = false;
let minutes = {};

function startReading() {
    let lineReader = readline.createInterface({
        input: fs.createReadStream('4sorted.txt')
    });

    lineReader.on('line', function (line) {
        const pattern = /\[(.*)\] (.*)/;
        let match = line.match(pattern);
        //console.log(line);
        let thisTime = Date.parse(match[1]);
        let event = match[2];
        let guardMatch = event.match(/Guard #(\d+)/);
        if(guardMatch) {
            if(asleep == true) {
                console.log("weird, they slept through shift change?");
            }
            guard = parseInt(guardMatch[1]);
            asleep = false;
        } else if(event.match(/asleep/)) {
            if(asleep) {
                console.log("weird, while sleeping they fell asleep?");
            }            
            asleep = true;
        } else if(event.match(/wakes/)) {
            if(asleep) {
                if(!(guard in sleepies)) {
                    sleepies[guard] = 0;
                    minutes[guard] = (new Array(60)).fill(0);
                }
                const sleepMinutes = (thisTime-lastTime) / 60000;
                console.log([guard, thisTime, lastTime, thisTime-lastTime, sleepMinutes]);
                sleepies[guard] += sleepMinutes;
                for(let t = lastTime; t < thisTime; t += 60000) {
                    let minute = (new Date(t)).getMinutes();
                    minutes[guard][minute] += 1;
                }
                //console.log(sleepies);
            } else {
                console.log("weird, while awake they woke up?");
            }
            asleep = false;
        }
        lastTime = thisTime;
    });

    lineReader.on('close', function () {
        console.log(sleepies);
        let sleepiestGuard;
        let mostSleep = 0;
        for (const guard in sleepies) {
            if(sleepies[guard] > mostSleep) {
                mostSleep = sleepies[guard];
                sleepiestGuard = guard;
            }
        }
        console.log(minutes[sleepiestGuard].join(" "));

        let sleepiestMinute;
        let mostSleepings = 0;
        minutes[sleepiestGuard].forEach((count, minute) => {
            if(count > mostSleepings) {
                sleepiestMinute = minute;
                mostSleepings = count;
            }
        });
        console.log(sleepiestMinute);
        console.log(["part 1", sleepiestGuard, sleepiestMinute, (sleepiestMinute * sleepiestGuard)]);

        let predictableGuard;
        let predictableMinute;
        let mostPredictable = 0;
        for(let guard in minutes) {
            minutes[guard].forEach((count, minute) => {
                if(count > mostPredictable) {
                    predictableGuard = guard;
                    predictableMinute = minute;
                    mostPredictable = count;
                }
            });
        }
        console.log(["part 2", predictableGuard, predictableMinute, predictableMinute * predictableGuard]);
    });
};

startReading();