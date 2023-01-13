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
        console.log("time down");
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
    quiz.setAttribute("class", "hide");
    endScreen.classList.remove("hide");
    scoreDisplay.textContent = `${score}`;
}

function startTimer() {
    setInterval(function () {
        if (timeRemaining>0) {
          timerEl.textContent = `${timeRemaining} seconds remaining`;
          timeRemaining--;  
        } else {
          timerEl.textContent = "Time up!";
          endQuiz();
    
        }
      }, 1000);
}