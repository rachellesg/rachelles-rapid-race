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
// stage 1-4 of to do functionality

// DOING
// style correct and incorrect answers

// CURRENT BUGS
// score starts at 0 even after first correct input
// unable to restart just yet
// words may appear twice in a row

// TO DO (important to not so important)
// add restart button
// add loading (game lost) screen after game is over
// add sound effects for buttons
// add sound effects for correct and incorrect answers
// add more modes (css) && || (javascript)
// add option buttons for modes
// highlight LETTER by letter (currentWord) as user enters

// BASIC FUNCTIONALITY
// stage 1: words less than 8 letters ( after 3 words )
// stage 2: words less than 10 letters ( after 3 words )
// stage 3: words less than 15 characters ( after 2 words )
// stage 4: words more than 15 characters ( after 2 words )

// ++++++++++++++++++++++++ //

/* global vars */
var timer = 20; // timer to type all words

var score = 0; // total score
var isPlaying = false;; // if playing or not

var stage = 0; // (normal mode)

/* dom grabs */
var wordInput = document.querySelector("#word-input");
var currentWord = document.querySelector("#current-word");
var showScore = document.querySelector("#score");
var showTime = document.querySelector("#time");
var showMessage = document.querySelector("#message");
var showSeconds = document.querySelector("#seconds");
var startButton = document.querySelector("#start-button");
var overlayScreen = document.querySelector("#overlay-screen");
var overlayBox = document.querySelector(".overlay-box");

//// ++ BASIC FUNCTIONS ++ ////

// clear input
function clearInput() {
    document.querySelector("#word-input").value = "";
}

// creating top timebar
function createTimeBar () {
    var timeBar = document.querySelector("#timebar");
        timeBar.classList.add("timeleft");
    var barCountdown = setInterval(function() {
        timeBar.setAttribute('value', timer);
    },100);
}

// initialize game
function initGame () {
    createTimeBar();
    wordInput.disabled = false;
    wordInput.focus();
    startGame();
}

// <actually> start game
function startGame() {
    showWord(words);
    setInterval(countdownTimer, 1000);
    setInterval(checkStatus, 50);
    wordInput.onkeypress = function(event) {
    if (event.keyCode === 13) {
        if (checkMatch()) {
            stage++;
            calculateScore();
            showMessage.innerHTML = "Correct";
            // console.log("user stage" + stage); // tested and stage works
            clearInput();
        } else {
            showMessage.innerHTML = "Not correct";
            clearInput();
        }
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
        console.log('correct');
        showWord(words);
        return true;
    } else {
        console.log('no');
        setTimeout(function() {
            wordInput.classList.add("shake");
        },100);
        setTimeout(function() {
            wordInput.classList.remove("shake");
        },200);
        return false;
    }
        clearInput();
}

// countdown timer and calculate game end
function countdownTimer (isPlaying) {
    if (timer > 0) {
        isPlaying = true;
        timer--;
        //console.log(timer, isPlaying);
    } else if (timer === 0) {
        isPlaying = false;
        //console.log(timer, isPlaying);
    }
    showTime.innerHTML = timer;
}

// check game status
function checkStatus() {
  if (!isPlaying && timer === 0) {
    showMessage.innerHTML = 'Game Over!!!';
    currentWord.textContent = " ";
    clearInput();
    wordInput.disabled = true;
        // to do: add overlay to say game over
        // overlay.visibility = "visible";
  }
}

// ezpz calculate scores
function calculateScore() {
    var wordContent = currentWord.textContent;
    var wordLength = wordContent.length;
    if (wordLength >= 15) {
        score = score + 5;
        //console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 10) {
        score = score + 3;
        //console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 5) {
        score = score + 1;
        //console.log("this word is " + wordLength + " letters long");
    }
    showScore.innerHTML = score;
}

var counter = 3; // countdown 3,2,1 and start game

// to load countdown loading screen after start button is pressed
function loadingScreen() {
    overlayScreen.style.visibility = "visible";
    startButton.style.visibility = "hidden";
    var loadCountdown = setInterval(function() {
    counter = counter - 1;
    //for (var i = 0; i < counter; i++) {
        console.log("print count" + counter)
        overlayBox.innerHTML = counter;
        if (counter === 0) {
            overlayBox.innerHTML = "GO"
        }
    //}
    },1000);

    setTimeout(function(){
        initGame();
        clearInterval(loadCountdown);
        overlayScreen.style.visibility = "hidden";
    }, 4000);
}
