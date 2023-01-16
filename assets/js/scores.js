let highScores = JSON.parse(localStorage.getItem("highScores"));
console.log(highScores);
let initials = Object.keys(highScores);
let scores = Object.keys(highScores);
let scoreArea = document.getElementById("highscores");

for (let i=0; i<scores.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${initials[i]} - ${scores[i]}`;
    scoreArea.appendChild(li);
}