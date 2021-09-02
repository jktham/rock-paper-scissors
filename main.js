let playerScore = 0;
let computerScore = 0;
let maxScore = 0;
let round = 0;

let buttons = Array.from(document.querySelectorAll("button"));
let input = document.querySelector("input");
let roundDiv = document.querySelector("#div-round");
let scoreDiv = document.querySelector("#div-score");
let textDiv = document.querySelector("#div-text");

buttons.forEach(function (button) {
    button.addEventListener("click", userChoice);
    button.style.display = "none";
    buttons[0].style.display = "inline-block";
});

function toggleButtons() {
    buttons.forEach(function (button) {
        if (button.style.display === "none") {
            button.style.display = "inline-block";
            input.disabled = true;
        } else {
            button.style.display = "none";
            input.disabled = false;
        }
    });
}

function computerChoice() {
    let choice = Math.floor(Math.random()*3);
    return choice;
}

function userChoice(e) {
    switch(e.target.id) {
        case "button-start":
            startGame();
            break;
        case "button-rock":
            playRound(0, computerChoice());
            break;
        case "button-paper":
            playRound(1, computerChoice());
            break;
        case "button-scissors":
            playRound(2, computerChoice());
            break;
    }
}

function playRound(playerSelection, computerSelection) {
    round++;
    if (playerSelection == computerSelection) {
        output(`Tie! Both chose ${toWord(playerSelection)}.`);
    } else if (playerSelection == computerSelection-1 || playerSelection == computerSelection+2) {
        playerScore++;
        output(`You win! ${toWord(playerSelection)} beats ${toWord(computerSelection)}.`);
    } else {
        computerScore++;
        output(`You lose! ${toWord(playerSelection)} is beaten by ${toWord(computerSelection)}.`);
    }
    if (playerScore == maxScore) {
        scoreDiv.style.color = "#00a300";
        toggleButtons();
    } else if (computerScore == maxScore) {
        scoreDiv.style.color = "#FF0000";
        toggleButtons();
    }
}

function startGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    maxScore = input.value;
    scoreDiv.style.color = "#000000";
    toggleButtons();
    output("Rock, Paper, Scissors!");
}

function output(str) {
    roundDiv.textContent = `Round ${round}`;
    scoreDiv.textContent = `${playerScore}:${computerScore}`;
    textDiv.textContent = str;
}

function toWord(num) {
    switch(num) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}