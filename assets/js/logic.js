let currentQuestion = 0;
let questionTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
let startScreen = document.getElementById("start-screen");
let quiz = document.getElementById("questions");
let score = 0;
const questionChoices = ["answerA", "answerB", "answerC", "answerD"];

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
        console.log("score up");
        score+=10;
    } else {
        console.log("time down");
    }

}

function beginQuiz() {
    startScreen.setAttribute("class", "hide");
    quiz.classList.remove("hide");
    renderQuestion();
}