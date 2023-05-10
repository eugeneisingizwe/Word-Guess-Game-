var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numberBlanks= 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCounter;

// Empty array used to create blanks ans letters on the screen

var lettersInChosenWord = [];
var blanksLetters = [];

// Array of letter for the user to chose from 
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

console.log(words);

// The intial fuction that is called when the page laods 

function init(){
    getWin();
    getLoses();
}


// start game function when the start button is clicked

function startGame(){
    isWin = false;
    timerCounter = 30;

    // prevent the start button to be clicked when the round is in progress 
    startButton.disabled = true;

    renderBlanks();
    startTimer();
}

// win fuction is called when the win codation is met
function winGame() {
    wordBlank.textContent = "YOU WON!!! 🏆";
    winCounter++
    startButton.disabled = false;
setWin();

}

// lose fuction is called when the timer reaches zero
function loseGame(){
    wordBlank.textContent = "GAME OVER";
    loseCounter++
    startButton.disabled = false;
   setLose();
}

// the setTimer fuction starts and stops the timer and triggers winGame() and loseGame()

function startTimer() {
    timer = setInterval(function(){
        timerCounter--;
        timerElement.textContent = timerCounter;

        if (timerCounter >= 0){
            
            if (isWin && timerCounter > 0 ){
                clearInterval(timer);
                winGame();
            }
        }

        if (timerCounter === 0){
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

// Creates blaks on the screen 

function renderBlanks(){
    // Randomly picks words from the words array
    chosenWord = words[Math.floor(Math.random()* words.length)];
    console.log(chosenWord);
lettersInChosenWord = chosenWord.split("");
numberBlanks = lettersInChosenWord.length;
blanksLetters = [];


// Uses Loop to push blanks to blankLetters array

for (var i = 0; i < numberBlanks; i++){
    blanksLetters.push("_");
}
wordBlank.textContent = blanksLetters.join(" ")

}

// Updates win count on screen and sets win count to client storage 

function setWin(){
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage 

function setLose(){
    lose.textContent = loseCounter;
    localStorage.setItem("loseCounter", loseCounter);
}

// functions are used by init

function getWin(){
    var storedWins = localStorage.getItem("winCount");

    // if stored value does not exist set counter to 0
     if (storedWins === null){
        winCounter = 0;
     } else  {
        // if a value is retrieved from client storage set that winCounter to that value
        winCounter = storedWins;
    }

    // render win counter to the page

    win.textContent = winCounter;

}

function getLoses(){
    var storeLosses = localStorage.getItem("loseCounter")

    if (storeLosses === null){
        storeLosses = 0;
    
    } else {
        loseCounter = storeLosses;
    }

    lose.textContent = loseCounter
}

function checkWin(){
    // if the word equal to the blankLetters array when converted to a string, set isWin to true

    if (chosenWord === blanksLetters.join("")){

        // this value is used in the timer function to test if the condition is true 
        isWin = true;
    }
}

// tests if guessed letter is in the worsd and renders it to the screen 
function checkLetters(letter){
    var letterInWord = false;
    for (var i = 0; i < numberBlanks; i++){
        if (chosenWord[i] === letter){
            letterInWord = true;
        }
    }

    if (letterInWord){
        for (var j = 0; j < numberBlanks; j++){
            if (chosenWord[j] === letter){
                blanksLetters[j] = letter;
            }
        }
        wordBlank.textContent = blanksLetters.join(" ");
    }
}

//attach event listener to document to lsiten for key event

document.addEventListener("keydown", function(event){
    // if the count is zero, exsit function
    if (timerCounter === 0){
        return
    }

    //convert all keys to lower case

    var key = event.key.toLocaleLowerCase();
    var alphabetNumericCharachets = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    if(alphabetNumericCharachets.includes(key)){
        var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
    }
})

//attacj event listener to start button to call startGame function on click

startButton.addEventListener("click" , startGame);

// Calls init so that it fires when the page open
init();

// add reset button 

var restButton = document.querySelector(".reset-button");

function resetGame(){
     winCounter = 0;
     loseCounter =0;

     setWin();
     setLose();
}

// attach event listener to the button 

restButton.addEventListener("click", resetGame);