questions = [
    {
        "question": "Психология",
        "answer": "наука о закономерностях, механизмах, условиях, факторах и особенностях развития и функционирования психики"
    },
    {
        "question": "Психика",
        "answer": "свойство человека или животного субъективно отражать события объективной реальности для его ориентации и взаимодействия с окружающий средой"
    },
    {
        "question": "Задатки",
        "answer": "генетически заложенная предрасположенность человека к какому-либо виду деятельности"
    },
    {
        "question": "Одаренность",
        "answer": "уникальный уровень развития личных способностей человека"
    },
    {
        "question": "Талант",
        "answer": "высший уровень развития способностей"
    },
    {
        "question": "Гениальность",
        "answer": "высшая степень таланта, способность создавать уникальное, качественно новое, это исключительно высокие интеллектуальные способности"
    },
    {
        "question": "Сознание",
        "answer": "психическая активность, которая представляет собой уровень восприятия внешнего мира и внутреннего состояния организма"
    },
    {
        "question": "Темперамент",
        "answer": "природно-обусловленная склонность человека к определённому стилю поведения, т.е. совокупность индивидуальных психических и физиологических особенностей индивида"
    },
    {
        "question": "Деятельность",
        "answer": "совершение человеком последовательности физических и (или) умственных действий, направленных на достижение конкретной цели"
    },
    {
        "question": "Потребность",
        "answer": "нужда людей в чём-либо, которая помогает ему поддерживать жизнедеятельность и развиваться как личность"
    },
    {
        "question": "Самооценка",
        "answer": "оценка личностью самого себя, своих возможностей, качеств и места среди других людей; ценность, приписываемая себе или отдельным качествам личности"
    },
    {
        "question": "Мотив",
        "answer": "побуждение личности к тому или иному виду активности, связанной с удовлетворением определенной потребности (побудительная причина, повод к действию)"
    },
    {
        "question": "Эмоции",
        "answer": "субъективное переживание нашего отношения к окружающему и к самим себе"
    },
    {
        "question": "Чувство",
        "answer": "эмоциональный процесс человека, отражающий субъективное оценочное отношение к реальным или абстрактным объектам"
    },
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

    currentQuestion = 0;

    // randomize
    randomQuestions = [];
    randomAnswers = [];
    for (let i = questions.length - 1; i >= 0; i--) {
        let randomNumber = randomInteger(0, i);
        randomQuestions.push(ques[randomNumber]['question']);
        randomAnswers.push(ques[randomNumber]['answer']);
        ques.splice(randomNumber, 1);
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
    $('#questionBlock').html("Коллоквиум завершен");
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
window.onload = function () {
    initializeRandomQuestions();
    showStartingScreen();
}