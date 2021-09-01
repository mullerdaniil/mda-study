/*
    mode:
        1 - non-active (...)
        2 - memorization
        3 - typing the answer
        4 - see the results
 */
let mode = 1;
let timerInterval;
let timeout = 10;
let timePassed = 0;
let timerActive = false;

let digitsCount = 24;
const DIGITS_COUNT_LIMIT = 48;
let currentDigits = "";

window.onload = () => {
    $("#answerField").prop('disabled', true);
    digitsCount = localStorage.getItem('digitsCount');
}

window.onkeydown = (event) => {
    if (event.keyCode === 32) { // SPACE
        if (mode === 1) {
            mode = 2;
            currentDigits = generateRandomDigits();
            $('#digits').html(currentDigits);
            startTimer();

        } else if (mode === 2) {
            hideDigits();
        } else if (mode === 4) {
            mode = 1;
            $('#answerField').val('');
            $('#digits').html('><');
            $('body').css('background-color', 'midnightblue');
        }
    }

    if (event.keyCode === 13) { // ENTER
        onSubmitButton();
    }
}

function showResults() {
    let result = $('#answerField').val().trim() === currentDigits;
    if (result)
        $('body').css('background-color', 'springgreen');
    else
        $('body').css('background-color', 'red');
    $('#digits').html(currentDigits);


}

function onDigitsBlockClick() {
    if (mode === 2) {
        hideDigits();
    }
}

function hideDigits() {
    mode = 3;
    endTimer();
    $('#digits').html('...');
    $("#answerField").prop('disabled', false);
    $('#answerField').focus();
}

function onSubmitButton() {
    if (mode === 3) {
        showResults();
        $("#answerField").prop('disabled', true);
        mode = 4;
    }
}

function setDigitsCount() {
    let count;

    try {
        count = Number($('#sizeField').val());
    } catch (e) {

    }

    if (count > 0 && count <= DIGITS_COUNT_LIMIT) {
        digitsCount = count;
        localStorage.setItem('digitsCount', count);
    }
}

function generateRandomDigits() {
    let result = "";
    for (let i = 0; i < digitsCount; i++) {
        result += randomDigit();
    }

    return result;
}

function randomDigit() {
    return randomInteger(0, 9);
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function startTimer() {
    timerActive = true;
    timePassed = 0;

    timerInterval = setInterval(() => {

        timePassed++;
        displayTime();

    }, timeout);
}


function endTimer() {
    timerActive = false;
    clearInterval(timerInterval);
}


function displayTime() {
    let centiseconds = timePassed % 100;
    let csec = centiseconds + "";
    if (centiseconds < 10)
        csec = "0" + csec;

    let seconds = Math.floor(timePassed / 100);
    $('#timer').html(`${seconds}.${csec}`);
}