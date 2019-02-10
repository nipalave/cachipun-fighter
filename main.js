/* DOM elements */
const playerScore_span = document.getElementById("player-score");
const cpuScore_span = document.getElementById("cpu-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result-option");
const result_message = document.querySelector(".result-message");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const gameover_screen = document.querySelector(".gameover-screen");
const player_dmg = document.querySelector(".player-dmg");
const cpu_dmg = document.querySelector(".cpu-dmg");
const player_hp = document.getElementById("p-hp");
const cpu_hp = document.getElementById("c-hp");
const middle_section = document.querySelector(".middle-section");
const combo_counter_player = document.querySelector(".combo-counter-player");
const combo_counter_cpu = document.querySelector(".combo-counter-cpu");

//Constantes
const fullHP = 4;
const dmg_value = 25;
var player_dmg_value = 0;
var cpu_dmg_value = 0;
let playerScore = fullHP;
let cpuScore = fullHP;
var gameover = false;
var playCount = 0;
let comboCount = 1;
let comboCountCpu = 1;
var gameResults = [];
const win_message = "YOU WIN";
const lose_message = "YOU LOSE";


/*Get result messages */
const result_option_content = result_div.innerHTML;
const result_message_content = result_message.innerHTML;


//Set Score/Life
playerScore_span.innerHTML = fullHP;
cpuScore_span.innerHTML = fullHP;

var _actionRock = function () {
    game("r");
}

var _actionPaper = function () {
    game("p");
}

var _actionScissors = function () {
    game("s");
}

function getCpuChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * (choices.length));
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter == "r") return "Rock";
    if (letter == "p") return "Paper";
    if (letter == "s") return "Scissors";
}

function widthToString(width) {
    var widthString = width.toString() + "%";
    return widthString;
}

function doDamageCpu() {
    cpu_dmg_value = cpu_dmg_value + dmg_value;
    cpu_dmg.style.width = widthToString(cpu_dmg_value);

    //health glow
    /*
    cpu_hp.classList.add('red-glow');
    setTimeout(() => {
        cpu_hp.classList.remove('red-glow');
    }, 300);
    */

}

function doDamagePlayer() {
    player_dmg_value = player_dmg_value + dmg_value;
    player_dmg.style.width = widthToString(player_dmg_value);

    //health glow
    /*
    player_hp.classList.add('red-glow');
    setTimeout(() => {
        player_hp.classList.remove('red-glow');
    }, 300);
    */
}

function comboCounter() {
    if (gameResults.length > 1) {
        //Check Player combo
        if (gameResults[playCount - 1] == "w" && gameResults[playCount - 2] == "w") {
            comboCount++;
        } else {
            comboCount = 1;
        }

        //Check CPU combo
        if (gameResults[playCount - 1] == "l" && gameResults[playCount - 2] == "l") {
            comboCountCpu++;
        } else {
            comboCountCpu = 1;
        }
    }

    //Print player combo
    if (comboCount >= 2) {
        combo_counter_player.innerHTML = "<span style='font-size: 45px;'>" + comboCount + "</span>" + " Hit Combo!";
    } else {
        combo_counter_player.innerHTML = "";
    }

    //Print Cpu Combo
    if (comboCountCpu >= 2) {
        combo_counter_cpu.innerHTML = "<span style='font-size: 45px;'>" + comboCountCpu + "</span>" + " Hit Combo!";
    } else {
        combo_counter_cpu.innerHTML = "";
    }
}


function endGame(message) {
    /* Variables */
    gameover_screen.style.visibility = "visible";
    gameover = true;

    /* remove listeners */
    rock_div.removeEventListener('click', _actionRock);
    paper_div.removeEventListener('click', _actionPaper);
    scissors_div.removeEventListener('click', _actionScissors);

    /* Print Message */
    document.querySelector(".gameover-title").innerHTML = message;
}

function resetGame() {
    playerScore = fullHP;
    playerScore_span.innerHTML = playerScore;

    cpuScore = fullHP;
    cpuScore_span.innerHTML = cpuScore;

    /* Reset Health Bars */
    player_dmg_value = 0;
    cpu_dmg_value = 0;

    player_dmg.style.width = 0;
    cpu_dmg.style.width = 0;

    /*Reset Message */
    result_div.innerHTML = result_option_content;
    result_message.innerHTML = result_message_content;

    gameover_screen.style.visibility = "hidden";
    gameover = false;

    /* Reset combo */
    gameResults.length = 0;
    playCount = 0;
    comboCount = 1;
    comboCountCpu = 1;
    combo_counter_player.innerHTML = "";
    combo_counter_cpu.innerHTML = "";

    main();
}


function win(userChoice, computerChoice) {
    console.log("YOU WIN");
    cpuScore--;
    cpuScore_span.innerHTML = cpuScore;
    //playerscore_span.innerHTML = playerScore;
    result_div.innerHTML = `${convertToWord(userChoice)} > ${convertToWord(computerChoice)}`;
    result_message.innerHTML = "You Win!";

    //Healthbar damage
    doDamageCpu();

    //Check if game is over
    if (cpuScore == 0) {
        endGame(win_message);
    }

    //Combo
    playCount++;
    gameResults.push("w");
    console.log(gameResults);
    comboCounter();

    //score glow
    cpuScore_span.classList.add('red-glow-score');
    setTimeout(() => {
        cpuScore_span.classList.remove('red-glow-score');
    }, 200);

    //background glow
    middle_section.classList.add('green-glow-background');
    setTimeout(() => {
        middle_section.classList.remove('green-glow-background');
    }, 200);

}


function lose(userChoice, computerChoice) {
    console.log("YOU LOSE");
    playerScore--;
    playerScore_span.innerHTML = playerScore;
    //cpuScore_span.innerHTML = cpuScore;
    result_div.innerHTML = `${convertToWord(userChoice)} < ${convertToWord(computerChoice)}`;
    result_message.innerHTML = "You Lose";

    //Check if game is over
    if (playerScore == 0) {
        endGame(lose_message);
    }

    //Healthbar damage
    doDamagePlayer();

    //Combo
    playCount++;
    gameResults.push("l");
    console.log(gameResults);
    comboCounter();

    //score glow
    playerScore_span.classList.add('red-glow-score');
    setTimeout(() => {
        playerScore_span.classList.remove('red-glow-score');
    }, 200);

    //background glow
    middle_section.classList.add('red-glow-background');
    setTimeout(() => {
        middle_section.classList.remove('red-glow-background');
    }, 200);
}

function draw(userChoice, computerChoice) {
    console.log("DRAW");
    result_div.innerHTML = `${convertToWord(userChoice)} = ${convertToWord(computerChoice)}`;
    result_message.innerHTML = "Draw";

    //choice
    /*
    document.getElementById(userChoice).classList.add('gray-glow');
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove('gray-glow');
    }, 200);
    */

    //Combo
    console.log(gameResults);

    //score glow
    scoreBoard_div.classList.add('gray-glow-score');
    setTimeout(() => {
        scoreBoard_div.classList.remove('gray-glow-score');
    }, 300);
}


function game(userChoice) {
    const computerChoice = getCpuChoice();
    console.log("Player choice => " + userChoice);
    console.log("CPU choice => " + computerChoice);

    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
    }
}


function main() {
    /* Add Event Listeners */
    rock_div.addEventListener('click', _actionRock);
    paper_div.addEventListener('click', _actionPaper);
    scissors_div.addEventListener('click', _actionScissors);

}

/* Execute Main */
main();


