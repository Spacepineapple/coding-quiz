//Get highScores from local storage and convert to object
let highScores = JSON.parse(localStorage.getItem("highScores"));
//Get keys (i.e., user initials) from highscores object
let initials = Object.keys(highScores);
//Get values (i.e., user scores) from highscores object
let scores = Object.values(highScores);
//Get highscores empty ordered list and assign to a variable
let scoreArea = document.getElementById("highscores");
//Get clear scores button and assign to a variable
let clearButton = document.getElementById("clear");

//Iterate through scores and initials
for (let i=0; i<scores.length; i++) {
    //Create an empty list node
    const li = document.createElement("li");
    //Add initials and score to the list node
    li.textContent = `${initials[i]} - ${scores[i]}`;
    //Add to the display area
    scoreArea.appendChild(li);
}

//Add function to clear local storage if clear button is clicked
clearButton.addEventListener("click", clearStorage);

//Remove files from localStorage
function clearStorage() {
    localStorage.clear();
}

