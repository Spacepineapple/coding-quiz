let highScores = JSON.parse(localStorage.getItem("highScores"));
console.log(highScores);
let initials = Object.keys(highScores);
let scores = Object.values(highScores);
let scoreArea = document.getElementById("highscores");
let clearButton = document.getElementById("clear");

for (let i=0; i<scores.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${initials[i]} - ${scores[i]}`;
    scoreArea.appendChild(li);
}

clearButton.addEventListener("click", clearStorage);

function clearStorage() {
    localStorage.clear();
}

