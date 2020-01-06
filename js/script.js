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

// DOING
// add more modes (css) && || (javascript)
// add option buttons for modes

// CURRENT BUGS
// words may appear twice in a row (only a bug if you want it to be lol)

// FIXED BUGS
// score starts at 0 even after first correct input
// after restart game timer goes twice as fast

// TO DO (important to not so important)
// highlight LETTER by letter (currentWord) as user enters

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

// grab bar
var progressBar = document.querySelector("progress");
var overlayScreen = document.querySelector("#overlay-screen");
var overlayBox = document.querySelector(".overlay-box");
var gameoverScreen = document.querySelector("#gameover-screen");
var gameoverBox = document.querySelector(".gameover-box");
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
        isPlaying = true;
        timer--;
        //console.log(timer, isPlaying);
      if (timer === 0) {
        isPlaying = false;
        clearInterval(countdownTimer);
      }
      showTime.innerHTML = timer;
    }, 1000);
}

// countdown timer and calculate game end
// function countdownTimer (isPlaying) {
//     if (timer > 0) {
//         isPlaying = true;
//         timer--;
//         console.log(timer, isPlaying);
//     } else if (timer === 0) {
//         isPlaying = false;
//         console.log(timer, isPlaying);
//     }
//     showTime.innerHTML = timer;
// }

// initialize game
function initGame() {
    wordInput.disabled = false;
    wordInput.focus();
    startGame();
}

// select mode
function normalMode () {
    chosenModes = 1;
    startButton.style.display = "block";
    cssModeButton.style.display = "none";
    normalModeButton.style.display = "none";
    modesMessage.style.visibility = "hidden";
    console.log("normal clicked" + chosenModes);
}

function cssMode () {
    chosenModes = 2;
    startButton.style.display = "block";
    cssModeButton.style.display = "none";
    normalModeButton.style.display = "none";
    modesMessage.style.visibility = "hidden";
    console.log("css clicked" + chosenModes);
}

// <actually> start game
function startGame() {
    if (chosenModes === 1) {
        showWord(words);
    } else if (chosenModes === 2) {
        showCssWord(css);
    }
    gameTimer();
    backgroundOST.play();
    backgroundOST.volume = 0.1;
    setInterval(checkStatus, 50);
    timeBar.style.visibility = "visible";
    floatingScore.style.visibility = "visible";
    wordInput.onkeypress = function(event) {
    if (event.keyCode === 13) {
        if (checkMatch()) {
            stage++;
            //console.log(stage);
            // have to put it here if not first correct answer = 0
            switch(stage) {
            case 1:
                showMessage.innerHTML = "Not too bad....";
            break;
            case 4:
                showMessage.innerHTML = "Doing well so far hey!";
            break;
            case 7:
                showMessage.innerHTML = "It's just gonna get harder from here!";
            break;
            case 10:
                showMessage.innerHTML = "Wow ok you're still here 🤨";
            break;
            case 12:
                showMessage.innerHTML = "Don't say I neh warn you,,,, from here on it's REALLY gonna get supercalifragileistically HARDER!";
            break;
            default:
                showMessage.innerHTML = "Good job...";
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

// restarts game immediately
function restartGame() {
    gameoverScreen.style.visibility = "hidden";
    initGame();
    timer = 45;
    life = 3;
    score = 0;
}

// generate CSS words
function showCssWord (css) {
    if (stage < 4) {
        var maxWords = css.easy.length; // ALL of the objects in word.easy array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = css.easy[wordIndex];
            //console.log(words.easy[wordIndex]);
        }
    } else if (stage >= 4 && stage < 7) {
        var maxWords = css.medium.length; // ALL of the objects in word.medium array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = css.medium[wordIndex];
            //console.log(words.medium[wordIndex]);
        }
    } else if (stage >= 7 && stage < 10) {
        var maxWords = css.hard.length; // ALL of the objects in word.hard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = css.hard[wordIndex];
            //console.log(words.hard[wordIndex]);
        }
    } else if (stage >= 10) {
        var maxWords = css.superhard.length; // ALL of the objects in word.superhard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = css.superhard[wordIndex];
            //console.log(words.superhard[wordIndex]);
        }
    }
}

// generate words
function showWord (words) {
    if (stage < 4) {
        var maxWords = words.easy.length; // ALL of the objects in word.easy array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = words.easy[wordIndex];
            //console.log(words.easy[wordIndex]);
        }
    } else if (stage >= 4 && stage < 7) {
        var maxWords = words.medium.length; // ALL of the objects in word.medium array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = words.medium[wordIndex];
            //console.log(words.medium[wordIndex]);
        }
    } else if (stage >= 7 && stage < 10) {
        var maxWords = words.hard.length; // ALL of the objects in word.hard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = words.hard[wordIndex];
            //console.log(words.hard[wordIndex]);
        }
    } else if (stage >= 10) {
        var maxWords = words.superhard.length; // ALL of the objects in word.superhard array
        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
        for (var i = 0; i <= wordIndex; i++) {
            currentWord.textContent = words.superhard[wordIndex];
            //console.log(words.superhard[wordIndex]);
        }
    }
}

// check word match
function checkMatch() {
    if (wordInput.value === currentWord.textContent) {
        calculateScore();
        if (chosenModes === 1) {
            showWord(words);
        } else if (chosenModes === 2) {
            showCssWord(css);
        }
        correctAnswer();
        //console.log(score);
        //console.log('correct');
        return true;
    } else {
        //console.log('no');
        // adding shakey shakey animation
        //console.log(timer);
        incorrectAnswer();
        return false;
    }
        clearInput();
}


// check game status
function checkStatus() {
    if ((!isPlaying && timer === 0) || life === 0) {
        //gameoverBox.innerHTML = 'Game Over!!!';
        currentWord.textContent = " ";
        showMessage.textContent = " ";
        clearInput();
        wordInput.disabled = true;
        gameoverScreen.style.visibility = "visible";
        gameoverBox.classList.add("bounce-in");
        backgroundOST.pause();
        backgroundOST.currentTime = 0;
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
    startButton.style.visibility = "hidden";
    var loadCountdown = setInterval(function() {
        counter = counter - 1;
        console.log("print count" + counter)
        overlayBox.innerHTML = counter;
        if (counter === 0) {
            overlayBox.innerHTML = "GO"
        }
    },1000);

    setTimeout(function(){
        initGame();
        clearInterval(loadCountdown);
        overlayScreen.style.visibility = "hidden";
    }, 4000);
}

//// ++ SOUNDS ++ ////

// sound effect for correct answer
function correctAnswer() {
    var right = document.getElementById("correct");
    right.play();
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
createTimeBar();
createHealth();