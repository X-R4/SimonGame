

var numclick = -1;//no.of clicks
var gamePattern = [];//correct pattern
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var HighScore = 0;
// 5Th user process
$(".btn").click(function(buttonClicked){//to operate with mose or click on buttons
  numclick++;//as we click no.of clicks increases.
  let color=buttonClicked.target.id;//we get the color ofth button clicked
  createAnimation("#"+color);
  playAudio(color);
  checkAnswer(color);
});
// 6th
function checkAnswer(color){
  userPattern.push(color);
  if(color==gamePattern[numclick]){//if the color clicked correct in position
    if(userPattern.length==gamePattern.length){//if the user pattern corresponds to game pattern
      setTimeout(function(){
        userPattern=[];
        numclick=-1;
        nextSequence();},1000);
      userPattern=[];//then level will be upgraded and user pattern will be new for next level
      nextSequence();//next level
      numclick=-1;//so that we can tell if the next level user pattern coresponds to new generated game pattern
    }
  }else{//if any wron button is pressed
    $("h1").text("Game Over");
    userPattern=[];
    gamePattern=[];
    if(level > HighScore){
      HighScore=level;
      $("#highscore").text(level);
    }
    level=0;//to restart the game with level 0
  }
}
// 2nd
function nextSequence(){
  level++;
  $("#level").text(level);
  var rand = Math.floor(Math.random() * 4);//gives 0-3
  let color = buttonColours[rand];
  gamePattern.push(color);
  playAudio(color);
  createAnimation("#"+color);//have to add id like # red="#"+red
}
// 3rd
function playAudio(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
// 4th
function createAnimation(id){//id or "#"+color
  $(id).fadeIn(100).fadeOut(100).fadeIn(100);
}
// 1st
$(document).keydown(function(){
  if(level <= 0){
    $("h1").text("the game begins");
    nextSequence();
  }
});

