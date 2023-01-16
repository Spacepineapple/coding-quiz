//Set current question to 0 to keep track of question number
let currentQuestion = 0;
//Initialise score variable and set to 0
let score = 0;
//Create timer and set to one minute (60 seconds)
let timeRemaining = 0;

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
    //Get the current question, data, correct answer and title:
    let question = questionNumbers[currentQuestion];
    let questionData = questions[question];
    let correct = questions[question]["correct"];
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
    let answer;
    if (event.target.classList.contains("correct")) {
        answer = "Correct";
    } else {
        timeRemaining-=15;
        answer = "Incorrect";
    }
    currentQuestion++;
    if (currentQuestion<Object.keys(questions).length) {
        choices.textContent = "";
        renderQuestion();  
        displayCorrect(answer);
    } else {
        endQuiz();
    }

}

function displayCorrect(answer) {
    const feedback = document.createElement("p");
    feedback.textContent = `${answer}`;
    choices.appendChild(feedback);
    setTimeout(function () {
        if (choices) {
            choices.removeChild(feedback);
        }
    }, 3000);
}

//Allow player to start the quiz
function beginQuiz() {
    //hide the start screen div
    startScreen.setAttribute("class", "hide");
    //display the quiz div
    quiz.classList.remove("hide");
    startTimer();
    renderQuestion();
}

//End the quiz
function endQuiz() {
    //hide the quiz div
    quiz.setAttribute("class", "hide");
    if (timeRemaining>0) {
        score = timeRemaining;
        //Stop the timer
        clearInterval(quizTimer);
        //display the end screen div
        endScreen.classList.remove("hide");
        //update the score area to show the player's score
        scoreDisplay.textContent = `${score}`;
        //allow the player to submit their initials through the submit button
        submitButton.addEventListener("click", submitInitials);    
    } else {
        startScreen.classList.remove("hide");
        timeRemaining = 60;
    }
}

//start a timer
function startTimer() {
    //Set the timer area to display the time remaining in seconds
    timerEl.textContent = `${timeRemaining} seconds remaining`;
    timeRemaining = 60;
    quizTimer;
    
}

let quizTimer = setInterval(function () {
    //While there is time remaining, remove one second and update the time display
    if (timeRemaining>0) {
      timeRemaining--;
      timerEl.textContent = `${timeRemaining} seconds remaining`;
    } else {
      //Otherwise change the time display to say "Time up!" and end the quiz 
      timerEl.textContent = "Time up!";
      endQuiz();

    }
  }, 1000);

//Get the high scores from local storage
function getHighScores() {
    //get highscores from local storage and turn into object
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    //if there are no highscores, set highscores to null
    if (highScores === null) {
        return null;
    } else {
        //otherwise, return null
        return highScores;
    }
} 

//Save the high scores to local storage
function setHighScores(scores) {
    //convert scores into a string
    let stringScores = JSON.stringify(scores);
    //save highscores to local storag
    localStorage.setItem("highScores", stringScores);
}

//add scores to the highscores object
function addScores(user, finalScore) {
    //get the highscores from local storage
    let highScores = getHighScores();
    //if highscores already exist (i.e., are not null)
    if (highScores != null) {
        //Get the existing values (i.e., current scores)
        let pastScores = Object.values(highScores);
        //Get the existing keys (i.e., current users)
        let pastUsers = Object.keys(highScores);
        //Create a variable to identify the index where finalScore should be added
        x=null;
        //Compare each score with finalscore
        for (let i=0; i<pastScores.length; i++) {
            if (pastScores[i] < finalScore) {
                //When finalscore is greater than the existing score, set x to
                //that index
                x=i;
                //Stop looping when x is set
                break;
            }
        }
        //If there is an index at which the past score is less than the new score
        if (x!=null) {
            //add the final score to the array of past scores at that index
            pastScores.splice(x, 0, finalScore);
            //add the user to the array of past users at that index
            pastUsers.splice(x, 0, user);
        } else {
            //otherwise simply add the score and user to the end of each array
            pastScores.push(finalScore);
            pastUsers.push(user);
        }
        //Create a new, empty object
        let newHighScores = {};
        //Iterate through the arrays and update the object using the arrays
        for (let i=0; i<pastScores.length; i++) {
            newHighScores[pastUsers[i]] = pastScores[i];
        }
        //Update the highscores variable
        highScores = newHighScores;
    } else {
        //Otherwise create an empty object and add user and score to it
        highScores = {};
        highScores[user] = finalScore;
    }
    setHighScores(highScores);
}

function submitInitials(event) {
    //Get the user's initials from the input area
    let initials = initialsInput.value;
    let highscores = getHighScores();
    //If a user with those initials already exists, request new initials
    if (Object.keys(highScores).getItem(initials) != null && highScores[initials]===score) {
        window.alert("Cannot set score. A score with those initials already exist \nPlease try different initials.")
    } else {
        //Add their score and initials to the highscores object
        addScores(initials, score);
        //Load the highscores page
        window.location.assign("./highscores.html");

    }
}