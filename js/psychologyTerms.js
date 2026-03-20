questions = [
    {
        "question": "Психология",
        "answer": "наука, изучающая закономерности возникновения, развития и функционирования психики и психической деятельности человека и групп людей"
    },
    {
        "question": "Психика",
        "answer": "1) субъективный внутренний мир человека, опосредующий взаимодействие человека с внешним миром; 2) совокупность всех внутренних процессов, обеспечивающих взаимодействие с миром, восприятие, мышление, чувства, поведение и даже самосознание"
    },
    {
        "question": "Предмет психологии",
        "answer": "механизмы и закономерности психики человека"
    },
    {
        "question": "Объект психологии",
        "answer": "психические процессы и психические явления, обеспечивающие жизнедеятельность, развитие, поведение, деятельность, взаимоотношения людей в больших и малых социальных группах"
    },
    {
        "question": "Задачи психологии",
        "answer": "сбор, изучение, анализ, обобщение фактов, установление механизмов и выявление закономерностей функционирования психики и поведения"
    },
    {
        "question": "Методы психологии",
        "answer": "те приемы и средства, с помощью которых получают достоверные сведения, используемые далее для построения научных теорий и выработки практических рекомендаций (анкетирование, опрос, наблюдение, эксперимент и др.)"
    },
    {
        "question": "Мышление",
        "answer": "познавательная деятельность человека, которая является опосредованным и обобщённым способом отражения действительности"
    },
    {
        "question": "Темперамент",
        "answer": "совокупность индивидуальных особенностей, характеризующих динамическую и эмоциональную стороны поведения человека, его деятельности и общения"
    },
    {
        "question": "Лабильность",
        "answer": "скорость развития ответа на раздражитель. Эмоциональная лабильность - это описание состояния, характеризующееся высокой изменчивостью эмоционального фона"
    },
    {
        "question": "Обобщение",
        "answer": "мысленное объединение предметов и явлений по их общим и существенным признакам"
    },
    {
        "question": "Сравнение",
        "answer": "сопоставление предметов и явлений, выявление их сходств и различий"
    },
    {
        "question": "Анализ",
        "answer": "мысленное разложение предмета на составляющие его части или выделение в нём отдельных свойств, черт, качеств"
    },
    {
        "question": "Синтез",
        "answer": "мысленное объединение отдельных, ранее разложенных элементов целого предмета в одно или их набор"
    },
    {
        "question": "Воображение",
        "answer": "психический процесс, позволяющий создавать человеку новые образы, идеи, эмоционально-чувственные состояния"
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

function onQuestionClick() {
    if (isQuestionShown && currentQuestion === questionsCount)
        showFinished();
    else if (isQuestionShown)
        showNextQuestion();
    else if (!isQuestionShown)
        showNextAnswer();
}

function onAnswerClick() {
    if (currentQuestion > 0)
        currentQuestion--;

    isQuestionShown = true;
    if (isQuestionShown && currentQuestion === questionsCount)
        showFinished();
    else if (isQuestionShown)
        showNextQuestion();

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