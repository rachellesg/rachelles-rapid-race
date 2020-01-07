console.log("hellu it me");

// ++++++ GAME LOGIC ++++++ //

// CURRENT FEATURES
// basic af typing speed game within X seconds
// timer counts down PLUS progress bar on the top for visualizing
// disabled highlighting of the currentWord box to disallow copying
// scoring system, the longer the word the more points
// input box will nudge if incorrect answer
// add loading (count down) screen after start button is pressed
// disabled input once game is over
// stage 1-4 of basic functionality
// add loading (game lost) screen with restart button after game is over
// minus one second for every wrong input
// add sound effects for correct and incorrect answers
// add sound effects for buttons
// add stage message (going to get harder)
// minus lives when incorrect
// add heart emojis to show life left
// add music as game goes on
// add more modes (css) && || (javascript)
// add option buttons for modes
// add countdown sfx

// DOING

// CURRENT BUGS
// words may appear twice in a row (only a bug if you want it to be lol)
// gameover sfx plays endlessly if i lost the game because of 0 lifes

// FIXED BUGS
// score starts at 0 even after first correct input
// after restart game timer goes twice as fast

// BASIC FUNCTIONALITY
// stage 1: words less than 8 letters ( after first 3 words )
// stage 2: words less than 10 letters ( after next 3 words )
// stage 3: words less than 15 characters ( after next 4 words )
// stage 4: words more than 15 characters ( after next 4 words )

// ++++++++++++++++++++++++ //

//// ++ GLOBAL VARS ++ ////

var timer = 45; // timer to type all words

var score = 0; // total score
var isPlaying = false; // if playing or not

var stage = 0; // (normal mode)

var life = 5;
var totalLives = ["❤️", "❤️", "❤️", "❤️", "❤️"];

var chosenModes;
var selectedMode;

// dom gribbity grabbity
var wordInput = document.querySelector("#word-input");
var currentWord = document.querySelector("#current-word");
var showScore = document.querySelector("#score");
var timeBar = document.querySelector("#timebar");
var showTime = document.querySelector("#time");
var showMessage = document.querySelector("#message");
var showSeconds = document.querySelector("#seconds");

// grab buttons
var startButton = document.querySelector("#start-button");
var restartButton = document.querySelector("#restart-button");

// options
var modesMessage = document.querySelector("#option-message");
var normalModeButton = document.querySelector("#normal-mode-button");
var cssModeButton = document.querySelector("#css-mode-button");
var phrasesModeButton = document.querySelector("#phrases-mode-button");
var backButton = document.querySelector("#back-button");
var endButton = document.querySelector("#end-button");

// grab bar
var progressBar = document.querySelector("progress");
var overlayScreen = document.querySelector("#overlay-screen");
var overlayBox = document.querySelector(".overlay-box");
var gameoverScreen = document.querySelector("#gameover-screen");
var gameoverBox = document.querySelector(".gameover-box");
var gameoverMessage = document.querySelector(".gameover-message");
var gamePlayScreen = document.querySelector("#gameplay-screen");

var floatingScore = document.querySelector(".floating-score");
var counter = 3; // countdown 3,2,1 and start game
var livesLeft = document.querySelector("#lives");
var backgroundOST = document.getElementById("background");

//// ++ BASIC FUNCTIONS ++ ////

// clear input
function clearInput() {
    document.querySelector("#word-input").value = "";
}

// creating lives
function createHealth() {
    for (var i = 0; i < totalLives.length; i++) {
        var hearts = document.createElement("span");
        hearts.classList.add("hearts"+[i]);
        hearts.innerHTML = totalLives[i];
        livesLeft.appendChild(hearts);
    }
}

// creating top timebar
function createTimeBar () {
    timeBar.classList.add("timeleft");
    var barCountdown = setInterval(function() {
        timeBar.setAttribute('value', timer);
    },10);
}

// timery things
function gameTimer () {
    var countdownTimer = setInterval(function(){
        timer--;
        console.log(timer, isPlaying);
      if ((timer === 0) || (life === 0) || (stage === 999)) {
        isPlaying = false;
        checkStatus();
        clearInterval(countdownTimer);
        console.log(timer);
      }
      showTime.innerHTML = timer;
    }, 1000);
    console.log(timer);
    timer = 45;
}

// initialize game
function initGame() {
    wordInput.disabled = false;
    wordInput.focus();
    startGame();
}

// select mode
function normalMode () {
    chosenModes = 1;
    selectedMode = words;
    stage = 0;
    backButton.style.display = "inline-block";
    startButton.style.display = "inline-block";
    phrasesModeButton.style.display = "none";
    cssModeButton.style.display = "none";
    normalModeButton.style.display = "none";
    modesMessage.innerHTML = "<h3>You chose to play <span class=\"selected\">Words</span></h3> In this mode you'll be typing words that start with 'R'... Press the 'START' button to begin the game!<br><br>";
    console.log("normal clicked" + chosenModes);
}

function phrasesMode () {
    chosenModes = 3;
    selectedMode = phrases;
    stage = 0;
    backButton.style.display = "inline-block";
    startButton.style.display = "inline-block";
    phrasesModeButton.style.display = "none";
    cssModeButton.style.display = "none";
    normalModeButton.style.display = "none";
    modesMessage.innerHTML = "<h3>You chose to play <span class=\"selected\">Phrases</span></h3> In this mode you'll be typing random phrases... or quotes from famous movies! Press the 'START' button to begin the game!<br><br>";
    console.log("normal clicked" + chosenModes);
}

function cssMode () {
    chosenModes = 2;
    selectedMode = css;
    stage = 0;
    backButton.style.display = "inline-block";
    startButton.style.display = "inline-block";
    phrasesModeButton.style.display = "none";
    cssModeButton.style.display = "none";
    normalModeButton.style.display = "none";
    modesMessage.innerHTML = "<h3>You chose to play <span class=\"selected\">CSS</span></h3> In this mode you'll be typing CSS properties along with their values... Press the 'START' button to begin the game!<br><br>";
    console.log("css clicked" + chosenModes);
}

function rechooseModes() {
    chosenModes = null;
    cssModeButton.style.display = "inline-block";
    normalModeButton.style.display = "inline-block";
    phrasesModeButton.style.display = "inline-block";
    startButton.style.display = "none";
    backButton.style.display = "none";
    modesMessage.innerHTML = "First, select your preferred mode:<br><br>";
}

// end game button
function endGame () {
    currentWord.textContent = " ";
    showMessage.textContent = " ";
    clearInput();
    wordInput.disabled = true;
    gameoverScreen.style.visibility = "visible";
    gameoverBox.classList.add("bounce-in");
    backgroundOST.pause();
    backgroundOST.currentTime = 0;
    endGameScore();
    timer = 45;
    totalLives = [];
    stage = 999;
    isPlaying = false;
    gameOverSound();
}

// <actually> start game
function startGame() {
    wordInput.focus();
    showWord(words);
    gameTimer();
    timer = 45;
    stage = 0;
    score = 0;
    createHealth();
    createTimeBar();
    console.log(timer);
    backgroundOST.play();
    backgroundOST.volume = 0.3;
    isPlaying = true;
    setInterval(checkStatus, 100);
    gamePlayScreen.style.visibility = "visible";
    timeBar.style.visibility = "visible";
    floatingScore.style.visibility = "visible";
    wordInput.onkeypress = function(event) {
    if (event.keyCode === 13) {
        if (checkMatch()) {
            stage++;
            console.log(timer);
            //console.log(stage);
            // have to put it here if not first correct answer = 0
            switch(stage) {
            case 1:
                showMessage.innerHTML = "Not too bad....";
            break;
            case 5:
                showMessage.innerHTML = "Doing well so far hey!";
            break;
            case 10:
                showMessage.innerHTML = "It's just gonna get harder from here!";
            break;
            case 15:
                showMessage.innerHTML = "Wow ok you're still here 🤨";
            break;
            case 20:
                showMessage.innerHTML = "From here on it's REALLY gonna get supercalifragileistically HARDER!";
            break;
            case 25:
                showMessage.innerHTML = "You're doing better than the average!";
            break;
            default:
                showMessage.innerHTML = "Good job!! Keep going!! 👍🏻";
                //console.log(stage);
            }
            // console.log("user stage" + stage); // tested and stage works
            clearInput();
        } else {
            // timer--;
            showMessage.innerHTML = "I don't think that's quite right... 🧐";
            clearInput();
        }
    }
    }
}

// // restarts game immediately
// function restartGame() {
//     gameoverScreen.style.visibility = "hidden";
//     initGame();
//     timer = 45;
//     totalLives = ["❤️", "❤️", "❤️", "❤️", "❤️"];
//     life = 5;
//     score = 0;
//     counter = 3;
//     livesLeft.innerHTML = totalLives.join("");
//     console.log(timer);
//     console.log(totalLives);
// }

function totalRestart() {
    chosenModes = null;
    isPlaying = false;
    gameoverScreen.style.visibility = "hidden";
    totalLives = ["❤️", "❤️", "❤️", "❤️", "❤️"];
    timer = 45;
    life = 5;
    counter = 3;
    showScore.innerHTML = "0";
    livesLeft.innerHTML = "";
    showTime.innerHTML = "30";
    buttons.style.display = "block";
    gamePlayScreen.style.display = "none";
    startButton.style.display = "none";
    backButton.style.display = "none";
    timeBar.style.visibility = "hidden";
    floatingScore.style.visibility = "hidden";
    cssModeButton.style.display = "inline-block";
    normalModeButton.style.display = "inline-block";
    phrasesModeButton.style.display = "inline-block";
    gameoverBox.classList.remove("bounce-in");
    modesMessage.innerHTML = "First, select your preferred mode:<br><br>";
}

// generate words
function showWord (words,phrases,css) {
    if (stage < 4) {
        var maxWords = selectedMode.easy.length; // ALL of the objects in word.easy array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        currentWord.textContent = selectedMode.easy[wordIndex];
    } else if (stage >= 4 && stage < 12) {
        var maxWords = selectedMode.medium.length; // ALL of the objects in word.medium array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        currentWord.textContent = selectedMode.medium[wordIndex];
    } else if (stage >= 12 && stage < 20) {
        var maxWords = selectedMode.hard.length; // ALL of the objects in word.hard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        currentWord.textContent = selectedMode.hard[wordIndex];
    } else if (stage >= 20) {
        var maxWords = selectedMode.superhard.length; // ALL of the objects in word.superhard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        currentWord.textContent = selectedMode.superhard[wordIndex];
    }
}

// check word match
function checkMatch() {
    if (wordInput.value === currentWord.textContent) {
        calculateScore();
        showWord(words);
        correctAnswer();
        return true;
    } else {
        // adding shakey shakey animation
        incorrectAnswer();
        return false;
    }
        clearInput();
}


// check game status
function checkStatus() {
    if ((!isPlaying && timer === 0) || (!isPlaying && life === 0)) {
        //gameoverBox.innerHTML = 'Game Over!!!';
        currentWord.textContent = " ";
        showMessage.textContent = " ";
        clearInput();
        wordInput.disabled = true;
        console.log(isPlaying);
        gameoverScreen.style.visibility = "visible";
        gameoverBox.classList.add("bounce-in");
        backgroundOST.pause();
        backgroundOST.currentTime = 0;
        endGameScore();
        totalLives = [];
        timeBar.style.visibility = "hidden";
        setTimeout(function() {
            gameOverSound();
        },1000);
        setTimeout(function() {
            life = 5;
            timer = 45;
            console.log(life);
        },2000);
    }
}

function endGameScore() {
    if (score <= 50) {
        gameoverMessage.innerHTML = "Wow you're horrible at this.... 👎🏻<br>You got " + score + " points";
    } else if (score > 50 && score <= 99) {
        gameoverMessage.innerHTML = "You're pretty shite 👎🏻<br>You got " + score + " points";
    } else if (score >= 100 && score < 150) {
        gameoverMessage.innerHTML = "NOOB!!!  👎🏻<br>You got " + score + " points";
    } else if (score >= 150) {
        gameoverMessage.innerHTML = "BELOW AVERAGE 👎🏻<br>You got " + score + " points";
    } else if (score >= 200) {
        gameoverMessage.innerHTML = "Meh, not too bad.. <br>You got " + score + " points";
    } else if (score >= 250) {
        gameoverMessage.innerHTML = "Just ok... <br>You got " + score + " points";
    } else if (score >= 300) {
        gameoverMessage.innerHTML = "Kinda impressive?? But not really. <br>You got " + score + " points";
    }  else if (score >= 350) {
        gameoverMessage.innerHTML = "WOW ok now I am impressed!! <br>You got " + score + " points";
    }
}

// ezpz calculate scores
function calculateScore() {
    var wordContent = currentWord.textContent;
    var wordLength = wordContent.length;
    if (wordLength >= 15) {
        score = score + 20;
        //console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 10) {
        score = score + 12;
        //console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 5) {
        score = score + 10;
        //console.log("this word is " + wordLength + " letters long");
    }
    showScore.innerHTML = score;
}


// to load countdown loading screen after start button is pressed
function loadingScreen() {
    gamePlayScreen.style.display = "block";
    buttons.style.display = "none";
    overlayScreen.style.visibility = "visible";
    countdownBeep();
    var loadCountdown = setInterval(function() {
        counter = counter - 1;
        console.log("print count" + counter)
        overlayBox.innerHTML = counter;
        if (counter === 0) {
            overlayBox.innerHTML = "GO";
            counter = 4;
        }
    }, 1000);
    setTimeout(function(){
        initGame();
        clearInterval(loadCountdown);
        overlayScreen.style.visibility = "hidden";
    }, 4000);
    wordInput.focus();
}

//// ++ SOUNDS ++ ////

function pauseAudio() {
    var allAudio = document.querySelectorAll("audio");
    allAudio.pause();
}

// sound effect for gameover
function gameOverSound() {
    var gameOverSfx = document.getElementById("gameover");
    gameOverSfx.play();
}

// sound effect for gameover
function countdownBeep() {
    var countdownbeep = document.getElementById("countdownbeep");
    countdownbeep.play();
}

// sound effect for correct answer
function correctAnswer() {
    var right = document.getElementById("correct");
    right.play();
    timer = timer + 3;
    if (timer > 45) {
        timer = 45;
    }
}

// sound effect for correct answer
function incorrectAnswer() {
    var wrong = document.getElementById("incorrect");
    wrong.play();
    setTimeout(function() {
        wordInput.classList.add("shake");
    },100);
    setTimeout(function() {
        wordInput.classList.remove("shake");
    },200);
    life--;
    totalLives.pop();
    livesLeft.innerHTML = totalLives.join("");
    //console.log("print" + totalLives.length);
}

// sound effect for buttons
function buttonHover() {
    var hover = document.getElementById("hoverbutton");
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function(item) {
        item.addEventListener("mouseover", function() {
            //this function does stuff
            hover.play();
        });
    });
}

buttonHover();
allAudio();