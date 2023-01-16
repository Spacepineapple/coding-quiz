//Set current question to 0 to keep track of question number
let currentQuestion = 0;
//Initialise score variable and set to 0
let score = 0;
//Create timer and set to one minute (60 seconds)
let timeRemaining = 60;

//Get page elements to facilitate display of quiz questions
//Get question-title h2 to display question titles
const questionTitle = document.getElementById("question-title");
//Get choices div to display answer options
const choices = document.getElementById("choices");
//Get four page divs each to be unhidden as player reaches that stage of quiz
const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const scoreDisplay = document.getElementById("final-score");
//Set questionChoices to simplify querying of questions object
const questionChoices = ["answerA", "answerB", "answerC", "answerD"];
//Get time span to allow display of timeRemaining in page
const timerEl = document.getElementById("time");
//Get submit button to allow player to submit their score
let submitButton = document.getElementById("submit");
//Get input area to allow player to enter their initials
let initialsInput = document.getElementById("initials");

//Create questions object containing 5 questions for quiz
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
        answerD: "A Data Type",
        correct: "An Object Property Function"
    }
}

//Get question numbers to facilitate change of questions
const questionNumbers = Object.keys(questions);

//Render each question to the quiz area
function renderQuestion() {
    //Get the current question
    let question = questionNumbers[currentQuestion];
    //Get the data for this question from the object
    let questionData = questions[question];
    //Get the correct answer
    let correct = questions[question]["correct"];
    //Get the title of the question
    questionTitle.textContent = questionData.question;
    //Iterate through each answer and add a button to submit each choice
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
    submitButton.addEventListener("click", submitInitials);
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
        return null;
    } else {
        return highScores;
    }
} 

function setHighScores(scores) {
    let stringScores = JSON.stringify(scores);
    localStorage.setItem("highScores", stringScores);
}

function addScores(user, finalScore) {
    let highScores = getHighScores();
    if (highScores != null) {
        console.log("runs");
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
        } else {
            pastScores.push(finalScore);
            pastUsers.push(user);
        }
        let newHighScores = {};
        for (let i=0; i<pastScores.length; i++) {
            newHighScores[pastUsers[i]] = pastScores[i];
        }
        highScores = newHighScores;
        console.log(newHighScores);
    } else {
        //Need to check that these initials don't already exist
        highScores = {};
        highScores[user] = finalScore;
    }
    setHighScores(highScores);
    console.log(highScores);
}

function submitInitials(event) {
    let initials = initialsInput.value;
    console.log(initials);
    console.log(score);
    addScores(initials, score);
    window.location.assign("./highscores.html");
}