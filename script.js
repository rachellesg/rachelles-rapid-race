console.log("hellu it me");

/* global vars */
var timer = 10; // timer to type all words

var speed = 1000;

var score = 0; // total score
var isPlaying = false;; // if playing or not
var counter = 3; // countdown 3,2,1 and start game

/* dom grabs */
var wordInput = document.querySelector("#word-input");
var currentWord = document.querySelector("#current-word");
var showScore = document.querySelector("#score");
var showTime = document.querySelector("#time");
var showMessage = document.querySelector("#message");
var showSeconds = document.querySelector("#seconds");

/* hard coded array of werds */
var words = [
    'raclette',
    'rubicon',
    'radiuses',
    'renegade',
    'rawhided',
    'ruckling',
    'rugulose',
    'rubellas',
    'repatriate',
    'romanticism',
    'rheumatism',
    'rathskeller',
    'rotundities',
    'ruffianisms',
    'reconnaissance',
    'reflectivities',
    'repudiationist',
    'rumormongering',
    'radiosensitivities',
    'radiochromatograms',
    'roentgenologically',
    'ribonucleoproteins'
];

/*** FUNCTIONS ***/

/* clear */
function clearInput() {
    document.querySelector("#word-input").value = "";
}

/* creating timebar */
function createTimeBar () {
    var timeBar = document.querySelector("#timebar");
    timeBar.classList.add("timeleft");
    var barCountdown = setInterval(function() {
        timeBar.setAttribute('value', timer);
    },100);
}

/* load words */
function initGame () {
    createTimeBar();
    startGame();
    showWord(words);
    setInterval(countdownTimer, speed);
    setInterval(checkStatus, 50);
}

/* start game */
function startGame() {
    wordInput.onkeypress = function(event) {
        if (checkMatch()) {
            showWord(words);
            score++;
            console.log("once user hits enter");
        }
    };

    if (score === -1) {
        showScore.innerHTML = 0;
        console.log("score this should show -1: " + score);
    } else {
        showScore.innerHTML = score;
        console.log("anything else BUT -1: " + score);
    }
}


/* grab from list of words */
function showWord (words) {
    var maxWords = words.length;
    var minWords = 0;
    var wordIndex = Math.floor(Math.random() * (maxWords - minWords));
    for (var i = 0; i <= wordIndex; i++) {
        currentWord.textContent = words[wordIndex];
        // console.log(wordIndex);
    }
}

/* check match */
function checkMatch() {
    if (wordInput.value === currentWord.textContent) {
        showMessage.innerHTML = "Correct";
        console.log('correct');
        return true;
    } else {
        showMessage.innerHTML = "Not correct";
        console.log('no');
        return false;
    }
        clearInput();
}

function countdownTimer (isPlaying) {
    if (timer > 0) {
        isPlaying = true;
        timer--;
        console.log(timer, isPlaying);
    } else if (timer === 0) {
        isPlaying = false;
        showMessage.innerHTML = "Game is OVER!";
        console.log(timer, isPlaying);
    }
    showTime.innerHTML = timer;
}

// check game status
function checkStatus() {
  if (!isPlaying && timer === 0) {
    showMessage.innerHTML = 'Game Over!!!';
        // to do: add overlay to say game over
    score = -1;
  }
}
