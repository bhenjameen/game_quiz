const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

alert("Welcome to 'Five Questions'\n\nAnswer the questions by clicking on the answers and click the 'Next' button to move to the next question.\nThe dots at the bottom are your question counters, indicating how many questions are right and how many are wrong.\n\nClick 'Ok' to start\nGood luck")

const questions = [{
        q: 'Which planet is closest to the sun?',
        options: ['Mercury',
            ' Pluto',
            ' Venus',
            'Saturn'
        ],
        answer: 0
    },
    {
        q: 'The number of 3-digit numbers divisible by 6, is ………… ',
        options: [166,
            150,
            151,
            149
        ],
        answer: 1
    },
    {
        q: 'What is the largest country in the world?',
        options: ['Italy',
            ' China',
            ' USA',
            'Russia'
        ],
        answer: 3
    },
    {
        q: 'How many teeth does an adult human have?',
        options: ['32',
            '28',
            '40',
            '35 '
        ],
        answer: 0
    },
    {
        q: 'A clock strikes once at 1 o’clock, twice at 2 o’clock, thrice at 3 o’clock and so on. How many times will it strike in 24 hours?',
        options: [78,
            136,
            196,
            156
        ],
        answer: 3
    }
]
totalQuestionSpan.innerHTML = questions.length;

function load() {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

function check(ele) {
    if (ele.id == questions[questionIndex].answer) {
        ele.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
        console.log("score:" + score);
    } else {
        ele.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions()
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer) {
            options[i].classList.add("correct");
        }
    }
}

function enableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}

function ValidityState() {
    if (!options[0].classList.contains("disabled")) {
        alert("Make your choice")
    } else {
        enableOptions();
        randomQuestion();
    }
}

function next() {
    ValidityState();
}

function randomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = 0;
    if (index == questions.length) {
        quizOver();
    } else {
        if (myArray.length > 0) {
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i] == randomNumber) {
                    hitDuplicate = 1;
                    break;
                }
            }
            if (hitDuplicate == 1) {
                randomQuestion();
            } else {
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }
        }
        if (myArray.length == 0) {
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
        }
        myArray.push(randomNumber);
    }
}

function answerTracker() {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(classNam) {
    answerTrackerContainer.children[index - 1].classList.add(classNam);
}

function quizOver() {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    // percentage.innerHTML=(score/questions.length)*100 + "%";
}

window.onload = function () {
    randomQuestion();
    this.answerTracker();
}