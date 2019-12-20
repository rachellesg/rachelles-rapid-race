console.log("hellu it me");

// ++++++ GAME LOGIC ++++++ //

// CURRENT FEATURES
// basic af typing speed game within X seconds
// disabled highlighting of the currentWord box to disallow copying
// scoring system, the longer the word the more points
// input box will nudge if incorrect answer
// add loading (count down) screen after start button is pressed
// disabled input once game is over

// DOING
// stage 1-4 of to do functionality
// style correct and incorrect answers

// TO DO (important to not so important)
// add restart button
// add loading (game lost) screen after game is over
// add sound effects for buttons
// add sound effects for correct and incorrect answers
// add more modes (css) && || (javascript)
// highlight LETTER by letter (currentWord) as user enters

// TO DO (functionality) still tbc
// stage 1: words less than 8 letters ( after 3 words )
// stage 2: words less than 10 letters ( after 3 words )
// stage 3: words less than 15 characters ( after 2 words )
// stage 4: words more than 15 characters ( after 2 words )

// hard mode
// stage 1: enter 5 words within 20 seconds
// stage 2: same but words are jumbled up
// stage 3: make new words out of stage 3's given word

// ++++++++++++++++++++++++ //

/* global vars */
var timer = 15; // timer to type all words

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
    // 'rotundities',
    // 'ruffianisms',
    // 'radionuclide',
    // 'repellencies',
    // 'rhizospheres',
    // 'reconnaissance',
    // 'reflectivities',
    // 'repudiationist',
    // 'rumormongering',
    // 'rhombencephalon',
    // 'retinoblastimas',
    // 'radiosensitivities',
    // 'radiochromatograms',
    // 'roentgenologically',
    // 'ribonucleoproteins'
];

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
    showWord(words);
    setInterval(countdownTimer, 1000);
    setInterval(checkStatus, 50);
}

// <actually> start game
function startGame() {
    wordInput.onkeypress = function(event) {
    if (event.keyCode === 13) {
        if (checkMatch()) {
            calculateScore();
            showMessage.innerHTML = "Correct";
            stage++;
            console.log("user stage" + stage);
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
    var maxWords = words.length;
    var minWords = 0;
    var wordIndex = Math.floor(Math.random() * (maxWords - minWords));
    for (var i = 0; i <= wordIndex; i++) {
        currentWord.textContent = words[wordIndex];
        console.log(currentWord.textContent.length);
            // words[i].length less than 8 (if stage less than 4)
            // words[i].length more than 8 (stage less than 8)
            // words[i].length more than 10 (stage less than 11)
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
        console.log(timer, isPlaying);
    } else if (timer === 0) {
        isPlaying = false;
        console.log(timer, isPlaying);
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
        console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 10) {
        score = score + 3;
        console.log("this word is " + wordLength + " letters long");
    } else if (wordLength >= 5) {
        score = score + 1;
        console.log("this word is " + wordLength + " letters long");
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
