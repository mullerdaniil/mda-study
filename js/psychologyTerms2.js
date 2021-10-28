questions = [
    "Психология",
    "Предмет психологии",
    "Психика",
    "Задачи психологии",
    "Принципы психологии",
    "Методы психологии",
    "Личность",
    "Самооценка",
    "Профессиональнаяа направленность личности",
    "Мотив",
    "Мотивация"
];

answers = [
    "наука о внутреннем мире человека, который проявляется в его мыслях, чувствах и поступках при взаимодействии с внешним миром",
    "изучение строения, закономерностей возникновения, развития и проявления и функционирования психики",
    "свойство головного мозга, заключающееся в отражении окружающего мира",
    "- изучение механизмов, закономерностей, качественных особенностей проявления и развития психических явлений;\n" +
    "- изучение природы и условий формирования психических особенностей личности на разных этапах ее развития в различных условиях;\n" +
    "- использование знаний в различных отраслях практической деятельности\n",
    "- детерминитзма (причины и следствия);\n" +
    "- историзма (развитие);\n" +
    "- объективизма (познаваемость);\n" +
    "- системности (взаимосвязь частей);\n" +
    "- интегративности (целостность);\n" +
    "- единства сознания и деятельности\n",
    "Наблюдение, эксперимент, анкетирование, беседа, тесты, опрос, самонаблюдение",
    "индивид, обладающий совокупностью социально-значимых качеств, которые он реализует в общественной жизни",
    "оценка личность самого себя, своих возможностей, качеств и места среди других людей; ценность, приписываемая себе или отдельным качествам личности",
    "направленность личности, адекватная предмету профессиональной деятельности, которая выступает показателем высокой сформированности мотивационного компонента психологической готовности личности к профессиональной деятельности",
    "побуждение личности к тому или иному виду активности, связанной с удовлетворением определенной потребности (побудительная причина, повод к действию)",
    "совокупность причин социально-психологического характера, объясняющих поведение  человека, его целенаправленность и активность (напр., отношение к работе, заинтересованность в результатах)"
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