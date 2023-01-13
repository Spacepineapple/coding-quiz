import {questions} from "./questions.js";
let currentQuestion = 0;
let questionTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
let startScreen = document.getElementById("start");
let quiz = document.getElementById("questions");

function renderQuestion() {
    if (currentQuestion<questions.length) {
        let question = questions[currentQuestion][0];
        document.createElement("ol");
        for (let i=0; i<4;i++) {
            let li = document.createElement("li");
            li.textContent = questions[currentQuestion][i];
            choices.appendChild(li);
        }
        
    }
    
}

function beginQuiz() {
    startScreen.setAttribute("class", "hide");
    quiz.classList.remove("hide");
    renderQuestion();
}