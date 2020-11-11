//for pregame choice
var firstNumEl = document.getElementById ('firstNumber');
var lastNumEl = document.getElementById ('lastNumber');
var firstNumOutputEl = document.getElementById ('firstNumOutput');
var lastNumOutputEl = document.getElementById ('lastNumOutput');
//for buttons
var compGuessesBtn = document.getElementById ('CompGuesses');
var userGuessesBtn = document.getElementById ('UserGuesses');
var checkBtn = document.getElementById ('checkNum');
var moreBtn = document.getElementById ('more');
var lessBtn = document.getElementById ('less');
var equalBtn = document.getElementById ('equal');  
var resetBtn = document.getElementById ('reset');
//for calculations
var randomCompNum;
var numToAsk = 0;
var lowLimit 
var maxLimit 
//for outputs
var compTalkingEl = document.getElementById ('CompTalking');
var userTriesEl = document.getElementById ('UserTries');
var congratulation = document.getElementById ('Congrats');
var compTriesEl = document.getElementById ('compTries');
var congratComp = document.getElementById ('congratComp');
//trials
var trialsLeftEl = document.getElementById ('numberOfTrials');
var maxTrials, trials = 0;

userGuessesBtn.disabled = true;
compGuessesBtn.disabled = true;
  
function enteringNum () {
    
    //first number less than 0
    if (+firstNumEl.value < 0) {
        return firstNumOutputEl.innerText = "Please enter a number larger than 0"
    }

    //first empty input
    else if (firstNumEl.value === "") {
        return firstNumOutputEl.innerText = "Please, enter a number"
    }

    //if the first number is integer
    else if (Number.isInteger (+firstNumEl.value) !== true) {
        return firstNumOutputEl.innerText = "Please enter an integer number"
    } 
    
    //last number less than 0
    else if (+lastNumEl.value < 0) {
        return lastNumOutputEl.innerText = "Please enter a number larger than 0"
    }

    //last empty input
    else if (lastNumEl.value === "") {
        return lastNumOutputEl.innerText = "Please, enter a number"
    }

    //if the last number less than first
    else if (+lastNumEl.value <= +firstNumEl.value) {
        return lastNumOutputEl.innerText = "The last number must be bigger than the first"
    }

    //if the last number is integer
    else if (Number.isInteger (+lastNumEl.value) !== true) {
        return lastNumOutputEl.innerText = "Please enter an integer number"
    } 
    
    //show first and last numbers
    else {
        lastNumOutputEl.innerText = "The last number is " + lastNumEl.value;
        firstNumOutputEl.innerText = "The first number is " + firstNumEl.value;
        //activate btns
        userGuessesBtn.disabled = false;
        compGuessesBtn.disabled = false;
        lowLimit = +firstNumEl.value;
        maxLimit = +lastNumEl.value;
    }
}

//generate radom numbers
function getRandom (from, to) {
    return Math.floor(from + Math.random()*(to + 1 - from))
}

function startingUserGuesses () {
    //hiding btns
    compGuessesBtn.style.display = 'none'
    userGuessesBtn.style.display = 'none'
    document.getElementById('chooseDiv').style.display = 'none'
    //activate user guesses mode
    document.getElementById('UserGuessesMode').style.display = "block";
    //comp thinks of a number and alerts about it
    randomCompNum = getRandom (+firstNumEl.value, +lastNumEl.value)
    compTalkingEl.innerText = "I thought of a number from " + firstNumEl.value + " to " + lastNumEl.value + ". Try to guess it!" 
    //calculate trials
    maxTrials = Math.ceil (Math.log2 (+lastNumEl.value - +firstNumEl.value + 1))
    trialsLeftEl.innerText = "You've got " + maxTrials + " trials left"
}

function continueUserGame () {
    //adding trials 
    trials++
    //if numbers are equal
    if (+userTriesEl.value === randomCompNum) {
        compTalkingEl.innerText = "";
        trialsLeftEl.innerText = "";
        congratulation.innerText = "Congratulations! You guessed the number! It's " + userTriesEl.value;
        resetBtn.style.display = "block";
    }
    //if a number from user is bigger 
    else if (+userTriesEl.value > randomCompNum) {
        compTalkingEl.innerText = "My number is less than " + userTriesEl.value
    }
    //if a number from user is less
    else if (+userTriesEl.value < randomCompNum) {
        compTalkingEl.innerText = "My number is bigger than " + userTriesEl.value
    }
    //show how many trials are left
    if (+userTriesEl.value !== randomCompNum) {
        if (trials < maxTrials) {
            trialsLeftEl.innerText = "You've got " + (maxTrials - trials)  + " trials left"
        }
        else {
            trialsLeftEl.innerText = "You've used all trials and lost this game. Try again."
            resetBtn.style.display = "block";
        }
    }
    userTriesEl.value = ""
}

function calcNumToAsk (min,max) {
    return Math.ceil(((max - min + 1)/2) + min - 1)
}

function startingCompGuesses () {
    //hiding btns
    compGuessesBtn.style.display = 'none'
    userGuessesBtn.style.display = 'none'
    document.getElementById('chooseDiv').style.display = 'none'
    //activate comp guesses mode
    document.getElementById('CompGuessesMode').style.display = "block";
    //calculate the first num to ask and ask
    numToAsk = calcNumToAsk (+firstNumEl.value, +lastNumEl.value)
    compTriesEl.innerText = "The computer thinks that your number is " + numToAsk + ". Is it true?"
}

//user's num is less
function lessThanCompThinks () {
    maxLimit = numToAsk - 1
    numToAsk = calcNumToAsk (lowLimit, maxLimit)
    compTriesEl.innerText = "The computer thinks that your number is " + numToAsk + ". Is it true?"
}
//user's num is bigger
function moreThanCompThinks () {
    lowLimit = numToAsk + 1
    numToAsk = calcNumToAsk (lowLimit, maxLimit)
    compTriesEl.innerText = "The computer thinks that your number is " + numToAsk + ". Is it true?"
}

function compGuessed () {
    congratComp.innerText = "Congratulations to the computer! He guessed your number. It was " + numToAsk;
    resetBtn.style.display = "block";
}
    
function enter (event) {       
    if (event.keyCode === 13) 
    checkBtn.click()
}

function resetGame () {
    //activate choosing btns and elements, clear values
    document.getElementById ('UserGuessesMode').style.display = "none";
    document.getElementById ('CompGuessesMode').style.display = "none";
    compGuessesBtn.style.display = "inline";
    userGuessesBtn.style.display = "inline";
    compGuessesBtn.disabled = true;
    userGuessesBtn.disabled = true;
    document.getElementById('chooseDiv').style.display = "block";
    firstNumEl.value = "";
    lastNumEl.value = "";
    firstNumOutputEl.innerText = "";
    lastNumOutputEl.innerText = "";
    congratulation.innerText = "";
    congratComp.innerText = "";
    resetBtn.style.display = "none";
}

firstNumEl.addEventListener ('input', enteringNum)
lastNumEl.addEventListener ('input', enteringNum)

userGuessesBtn.addEventListener ('click', startingUserGuesses)
compGuessesBtn.addEventListener ('click', startingCompGuesses)
checkBtn.addEventListener ('click', continueUserGame)
userTriesEl.addEventListener ('keyup', enter)

moreBtn.addEventListener ('click', moreThanCompThinks)
lessBtn.addEventListener ('click', lessThanCompThinks)
equalBtn.addEventListener ('click', compGuessed)

resetBtn.addEventListener ('click', resetGame)