/*jshint esversion: 6 */
var buttonColor = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomColor = "";
var level = 0;

//get random number beteween 0-3
function getRandomNumber() {
  var randomNumber = Math.floor(Math.random()*(4));
  return randomNumber;
}

//get random Color from buttonColor Array
function getRandomColor(rNumber) {
  var newColor = buttonColor[rNumber];
  //console.log(newColor);
  return newColor;
}
//add a color to the end of GamePattern array
function addColorToGamePattern(nColor) {
  gamePattern.push(nColor);
}
//get the css ID String from the Color
function getButtonID(flashColor) {
  var buttonID = "#" + flashColor;
  //console.log("ButtonID: " + buttonID);
  return buttonID;
}
//flash a button by buttonID
function flashButtonByID(btnID) {
  $(btnID).fadeOut(100).fadeIn(100);
}

//play accouring Sound for each Button (from /sounds)
function playSoundByButtonID(btnID) {
  var color = "";
  color = btnID.split('#')[1];

  var audioString = "sounds/" + color + ".mp3";
  console.log(audioString);
  var audio = new Audio(audioString);
  audio.play();
}
function animatePressByButtonID(btnID) {
  $(btnID).addClass("pressed");
  setTimeout(function() {
    $(btnID).removeClass("pressed");
  }, 100);
}

//add each clicked color to the end of userClickedPattern and play sound and animation
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  var btnID = getButtonID(userChosenColor);
  animatePressByButtonID(btnID);
  appendInputToClickedPatternRow(userChosenColor);
  //TODO: check if input is correct
  if(gamePattern[userClickedPattern.length-1] === userClickedPattern[userClickedPattern.length-1]) {
    playSoundByButtonID(btnID);
  }
  else {
    playSoundByButtonID("#wrong");
    fillGamePatternRow();
    $(".gamePatternRow").show();
    gameOver();
  }
  //check if level is finished
  if(areArraysEqual(gamePattern, userClickedPattern)) {
    level++;
    $("h1").html("Level " + level + " completed!");
    setTimeout(function(){startLevelwithNumber(level);}, 1500);
  }
});

//calls start game if conditions are met
$(document).keyup(function(event) {
  if(level === 0) {
    startGame();
  }

});

//sets all parameters for new game and starts it
function startGame() {
  level = 1;
  $(".gamePatternRow").hide();
  startLevelwithNumber(level);
}

//start new level by number
function startLevelwithNumber(level) {
  $("h1").html("Level " + level);
  //fill gamePattern
  console.log(userClickedPattern);
  let levelCounter;
  randomColor = [];
  gamePattern = [];
  userClickedPattern = [];
  clearUserClickedPatternRow();
  clearGamePatternRow();
  //run blink sequence for player
  for(levelCounter = 0; levelCounter < level; levelCounter++)
  {
    setTimeout(() => {
      var color = getRandomColor(getRandomNumber());
      var colorid = getButtonID(color);
      flashButtonByID(colorid);
      gamePattern.push(color);
      console.log(gamePattern);
    }, levelCounter * 500);
  }
}

//append user input to userClickedPattern row
function appendInputToClickedPatternRow(color) {
  var appendString = "<th class='" + color + " btn-mini " +  "' ></th>";
  $(".userClickedPattern-row").append(appendString);
}

//clear userClickedPattern-row
function clearUserClickedPatternRow() {
  $(".userClickedPattern-row").html("");
}

//fill gamePattern to gamePatternRow
function fillGamePatternRow() {
  var index;
  for (index = 0; index < gamePattern.length; index++) {
    var appendString = "<th class='" + gamePattern[index] + " btn-mini " +  "' ></th>";
    $(".gamePattern-row").append(appendString);
  }
}

//clear gamePatternRow
function clearGamePatternRow() {
  $(".gamePattern-row").html("");
}

//set parameters for gameOver
function gameOver() {
  level = 0;
  $("h1").html("Game Over! Press a key to start again!");
}

//check if two arrays are equal
function areArraysEqual(a1, a2) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}
