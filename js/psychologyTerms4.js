questions = [
    "Общение",
    "Психология",
    "Бихевиоризм",
    "Поведение",
    "Детерминизм",

    "Мотивация",
    "Мотив",
    "Учебная мотивация",
    "Потребность",
    "Самоактуализация"
];

answers = [
    "Обмен сообщениями, передача информации, установление контактов между людьми",
    "Наука о закономерностях развития и функционирования пс",
    "Направление психологии, предметом изучения которого является поведение людей, животных посредством систематического подхода",
    "Внешняя и внутренняя активность субъекта, проявляющаяся при его взаимодействии с окружающей средой",
    "Взаимосвязь всех явлений и процессов",

    "Побуждение к действию, способность человека деятельность удовлетворять свои потребности",
    "Материальный или деятельный предмет, достижение которого выступает смыслом деятельности",
    "Процесс, который запускает, направляет и поддерживает усилия на выполнение учебной деятельности",
    "Необходимость, нужда в чем-нибудь, требующая удовлетворение",
    "Стремление стать тем, что возможно, желание в самосовершенствовании, саморазвитии"
];


let randomQuestions = [];
let randomAnswers = [];

let questionsCount = questions.length;

let timeout = 1000;
let timePassed = 0;
let timerActive = false;
let timeLimit = 15;

let currentQuestion = 0;

let isQuestionShown = true;



function initializeRandomQuestions() {
    let ques = questions;
    let ans = answers;


    currentQuestion = 0;

    // randomize
    randomQuestions = [];
    randomAnswers = [];
    for (let i = questions.length - 1; i >= 0; i--) {
        let randomNumber = randomInteger(0, i);
        randomQuestions.push(ques[randomNumber]);
        randomAnswers.push(ans[randomNumber]);
        ques.splice(randomNumber, 1);
        ans.splice(randomNumber, 1);

    }

}


function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function showNextQuestion() {

    $('#answerBlock').hide();
    $('#timerBlock').html(formatTime(0));
    $('#timerBlock').show();



    if (timerActive)
        endTimer();

    timePassed = 0;
    timerActive = true;
    startTimer();

    $('#questionBlock').html(randomQuestions[currentQuestion]);

    isQuestionShown = !isQuestionShown;

}

function showNextAnswer() {
    $('#answerBlock').show();
    $('#timerBlock').hide();



    $('#answerBlock').html(randomAnswers[currentQuestion]);

    currentQuestion++;
    isQuestionShown = !isQuestionShown;

}


function showFinished() {
    $('#answerBlock').hide();
    $('#timerBlock').hide();
    $('#questionBlock').html("Коллоквиум завершен.");
}

function showStartingScreen() {
    $('#answerBlock').hide();
    $('#timerBlock').hide();
}


// key handling
window.onkeydown = function (event) {
    if (event.keyCode === 32) { // SPACE
        console.log(currentQuestion + " " + questions.length);

        if (isQuestionShown && currentQuestion === questionsCount)
            showFinished();
        else if (isQuestionShown)
            showNextQuestion();
        else if (!isQuestionShown)
            showNextAnswer();
    } else if (event.keyCode === 37) {
        if (currentQuestion > 0)
            currentQuestion--;

        isQuestionShown = true;
        if (isQuestionShown && currentQuestion === questionsCount)
            showFinished();
        else if (isQuestionShown)
            showNextQuestion();

    }
}


// ----- TIMER -----

function startTimer() {
    timerInterval = setInterval(() => {

        $('#timerBlock').html(formatTime(timePassed));


        if (timePassed === timeLimit)
            endTimer();

        timePassed++;

    }, timeout);
}


function endTimer() {
    timerActive = false;

    clearInterval(timerInterval);
}


function formatTime(time) {

    return `${timeLimit - time}`;
}


// on load
window.onload = function() {
    initializeRandomQuestions();
    showStartingScreen();
}