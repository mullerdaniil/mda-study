/*
    mode:
        1 - non-active
        2 - active

 */

let active = false;
let timeout = 100;
let timePassed = 0;
let answeredCount = 0;
let digitsList = [];


window.onkeydown = (event) => {
    if (event.keyCode === 32) { // SPACE
        startTraining();
    }
}

function startTraining() {
    if (!active) {
        active = true;
        timePassed = 0;
        answeredCount = 0;
        digitsList = generateUnits();
        console.log(digitsList);


        startTimer();
    }

    if (active) {
        answeredCount++;

        if (answeredCount === 101) {
            endTraining();
            return;
        }

        $('#count').html(answeredCount);
        $('#digits').html(digitsList[answeredCount - 1]);
    }
}

function endTraining() {
    $('#count').html("XXX");
    $('#digits').html("XXX");
    endTimer();
    active = false;
}

function generateUnits() {
    let person = generateNumbers();
    let action = generateNumbers();
    let object = generateNumbers();

    let result = [];

    let pRand, aRand, oRand;
    for (let i = 0; i < 100; i++) {
        pRand = randomInteger(0, 99 - i);
        aRand = randomInteger(0, 99 - i);
        oRand = randomInteger(0, 99 - i);

        let currentUnit = "";
        currentUnit += person[pRand];
        currentUnit += action[aRand];
        currentUnit += object[oRand];

        person.splice(pRand, 1);
        action.splice(aRand, 1);
        object.splice(oRand, 1);

        result.push(currentUnit);


    }

    return result;
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function generateNumbers() {
    let result = [];

    for (let i = 0; i < 100; i++) {
        let currentWord = "";
        if (i < 10)
            currentWord = "0" + i;
        else
            currentWord += i;
        result.push(currentWord);
    }

    return result;

}

// ----- TIMER -----

function startTimer() {
    timePassed = 0;

    timerInterval = setInterval(() => {

        timePassed++;
        displayTime();

    }, timeout);
}


function endTimer() {
    clearInterval(timerInterval);
}


function displayTime() {
    let deciseconds = timePassed % 10;


    let seconds = Math.floor(timePassed / 10);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    $('#timer').html(`${minutes}:${seconds}.${deciseconds}`);
}