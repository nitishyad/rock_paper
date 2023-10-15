// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");


const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const Button = document.querySelector(".button")
const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const scoreNumber_2 = document.querySelector(".score__number1");
let score = 0;
let score_2 = 0;

// Game Logic
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
        }, idx * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {


            resultText.innerText = "you win";
            resultDivs[0].classList.toggle("winner");
            keepScore(1);
            const BUTTON = document.getElementsByClassName("button ");
            BUTTON.style.display = "block";


        } else if (aiWins) {
            BUTTON.style.display = "none";
            resultText.innerText = "you lose";
            resultDivs[1].classList.toggle("winner");
            keepScoreai(1)
            BUTTON.style.display = "none";

        } else {
            resultText.innerText = "draw";
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;



}
function keepScoreai(points) {
    score_2 += points;
    scoreNumber_2.innerText = score_2;



}

// Play Again
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});







