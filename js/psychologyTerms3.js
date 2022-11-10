questions = [
    "Что изучает психология?",
    "Психика",
    "Методы в психологии",
    "Наблюдение",
    "Беседа",
    "Эксперимент",
    "Тестирование",
    "Анкетирование",
    "Мотив",
    "Мотивация",
    "Учебная мотивация",
    "Темперамент"
];

answers = [
    "факты, закономерности и механизмы психики",
    "свойства мозга отражать объективную действительность",
    "основные приемы и средства познания психических закономерностей",
    "целенаправленное, организованное и определённым образом фиксируемое восприятие исследуемого объекта",
    "метод установления в ходе непосредственного общения психических особенностей учащегося, позволяющий получить интересующую учителя информацию с помощью предварительно подготовленных вопросов",
    "проводимый в специальных условиях опыт для получения новых научных знаний посредством целенаправленного вмешательства исследователя в жизнедеятельность испытуемого",
    "метод, применяемый в эмпирических исследованиях, а также как метод измерения и оценки различных психологических качеств и состояний индивида",
    "сбор данных с помощью анкетных бланков (опросных листов), которые включают в себя ряд вопросов, организованных определенным образом и адресованных респонденту",
    "внутреннее побуждение к действию",
    "совокупность внутренних и внешних движущих сил, побуждающих человека действовать специфическим либо целенаправленным образом; процесс побуждения себя и других к деятельности для достижения целей организации или личных целей",
    "направленность обучающихся к различным сторонам учебной деятельности",
    "индивидуальные особенности личности, относящиеся к его психике, которые отражают психическую деятельность человека"
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