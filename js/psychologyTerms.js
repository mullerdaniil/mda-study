questions = [
    "Психология",
    "Предмет психологии",
    "Принципы психологии",
    "Задачи психологии",
    "Внимание",
    "Мышление",
    "Воображение",
    "Эмоции",
    "Чувства",
    "Мотивация",
    "Темперамент",
    "Я – концепция",
    "Направленность",
    "Личность",
    "Характер",
    "Акцентуация характера",
    "Задатки",
    "Способности",
    "Талант",
    "Гениальность"
];

answers = [
    "наука о закономерностях, механизмах, условиях, факторах и особенностях развития и функционирования психики",
    "Предметом психологической науки является психика человека (внутренний мир личности): ощущения и восприятие, внимание и память, воображение и мышление, общение и поведение, сознание и речь, способности, свойства и качества личности, деятельность, бессознательную сферу психики и многое другое",
    "1) принцип детерминизма, \n" +
    "2) принцип единства сознания и деятельности, \n" +
    "3) генетический принцип или принцип развития, \n" +
    "4) принцип ведущей роли деятельности в развитии психики (личностного подхода), \n" +
    "5) принцип психической целостности\n",
    "– изучение механизмов, закономерностей, качественных особенностей проявления и развития психических явлений;\n" +
    "– изучение природы и условий формирования психических особенностей личности на разных этапах ее развития и в различных условиях;\n" +
    "– использование полученных знаний в различных отраслях практической деятельности\n",
    "избирательная направленность сознания человека на определенные предметы и явления",
    "психический познавательный процесс отражения существенных связей и отношений предметов и явлений объективного мир",
    "психический познавательный процесс создания новых представлений на основе имеющегося опыта, т.е. процесс преобразующего отражения действительности",
    "непосредственная форма выражения чувств; временное переживание постоянного чувства, реакция человека на различные воздействия",
    "черта личности, относительно устойчивое отношение к окружающему миру; переживание человеком своего отношения ко всему тому, что он познает и делает, к тому, что его окружает",
    "побуждение к действию; внутреннее состояние, которое активизирует, направляет и поддерживает поведение, направленное на достижение определённых целей",
    "комплекс индивидуальных особенностей личности (врожденные способности), определяющих динамику ее поведения и психической деятельности",
    "результат самопознания, воплощенного в целостном представлении личности о самой себе",
    "ведущее свойство личности, которое определяется мировоззрением, системой потребностей и мотивов; выражена в жизненных целях, в активной деятельности по их достижению",
    "конкретный человек, взятый в системе его устойчивых социально обусловленных психологических характеристик, которые проявляются в общественных связях и имеют существенное значение для него самого и окружающих",
    "набор стойких индивидуальных особенностей личности, который определяет тип поведения и форму взаимоотношений с окружающими людьми",
    "чрезмерное усиление отдельных черт характера",
    "генетически заложенная предрасположенность человека к какому-либо виду деятельности",
    "индивидуальные особенности человека (свойства личности), позволяющие успешно заниматься какой-либо деятельностью",
    "высший уровень развития способностей",
    "высшая степень таланта, способность создавать уникальное, качественно новое, это исключительно высокие интеллектуальные способности"
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
window.onload = function() {
    initializeRandomQuestions();
    showStartingScreen();
}