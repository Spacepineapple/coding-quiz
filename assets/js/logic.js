let currentQuestion = 0;
let questionTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const scoreDisplay = document.getElementById("final-score");
let score = 0;
const questionChoices = ["answerA", "answerB", "answerC", "answerD"];
let timeRemaining = 60;
const timerEl = document.getElementById("time");
let highScores = getHighScores();

let questions = {
    question1: {
        question: "Which of the Following is not a JavaScript Primative?",
        answerA: "String",
        answerB: "Boolean",
        answerC: "Dictionary",
        answerD: "Null",
        correct: "Dictionary"
    },
    question2: {
        question: "Which of these Are Hoisted?",
        answerA: "Arrow Function",
        answerB: "Function Expressions",
        answerC: "Anonymous Functions",
        answerD: "Named Functions",
        correct: "Named Functions"
    },
    question3: {
        question: "What Does 'this' Refer to in the Browser's Global Scope?",
        answerA: "The Window Object",
        answerB: "Local Storage",
        answerC: "The Computer",
        answerD: "The Console",
        correct: "The Window Object"
    },
    question4: {
        question: "Which of the Following Defines an Immutable Variable?",
        answerA: "Let",
        answerB: "Const",
        answerC: "Var",
        answerD: "Def",
        correct: "Const"
    },
    question5: {
        question: "What is a Method?",
        answerA: "An Object Property Function",
        answerB: "An Algorithm",
        answerC: "A Type of Loop",
        answerD: "A Data Type"

    }
}

const questionNumbers = Object.keys(questions);


function renderQuestion() {
    let question = questionNumbers[currentQuestion];
    let questionData = questions[question];
    let correct = questions[question]["correct"];
    questionTitle.textContent = questionData.question;
    for (let i=0; i<questionChoices.length;i++) {
        let button = document.createElement("button");
        let answerOption = questionChoices[i];
        button.textContent = `${i+1}. ${questionData[answerOption]}`;
        if (questionData[answerOption] === correct) {
            button.setAttribute("class", "correct");
        }
        button.addEventListener("click", submitAnswer)
        choices.appendChild(button);
    }
}


function submitAnswer(event) {
    if (event.target.classList.contains("correct")) {
        score+=10;
    } else {
        timeRemaining-=15;
    }
    currentQuestion++;
    if (currentQuestion<Object.keys(questions).length) {
        choices.textContent = "";
        renderQuestion();    
    } else {
        endQuiz();
    }

}

function beginQuiz() {
    startScreen.setAttribute("class", "hide");
    quiz.classList.remove("hide");
    startTimer();
    renderQuestion();
}

function endQuiz() {
    timeRemaining = 0;
    quiz.setAttribute("class", "hide");
    endScreen.classList.remove("hide");
    scoreDisplay.textContent = `${score}`;
}

function startTimer() {
    timerEl.textContent = `${timeRemaining} seconds remaining`;
    setInterval(function () {
        if (timeRemaining>0) {
          timeRemaining--;
          timerEl.textContent = `${timeRemaining} seconds remaining`;
        } else {
          timerEl.textContent = "Time up!";
          endQuiz();
    
        }
      }, 1000);
}

function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores === null) {
        return
    } else {
        return highScores;
    }
} 

function setHighScores() {
    let highScores = JSON.stringify(highScores);
    if (highScores != null) {
        localStorage.setItem("highScores", highScores);
    }
}

function addScores(user, finalScore) {
    if (highScores != null) {
        let pastScores = Object.values(highScores);
        let pastUsers = Object.keys(highScores);
        x=null;
        for (let i=0; i<pastScores.length; i++) {
            if (pastScores[i] < finalScore) {
                x=i;
                break;
            }
        }
        if (x!=null) {
            pastScores.splice(x, 0, finalScore);
            pastUsers.splice(x, 0, user);
        }
        let newHighScores = {};
        for (let i=0; i<pastScores.length; i++) {
            newHighScores[user] = finalScore;
        }
        highScores = newHighScores;
    } else {
        //Need to check that these initials don't already exist
        highScores[user] = finalScore;
    }

}