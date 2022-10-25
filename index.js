var gamePattern=[];
var userClickedPattern=[];
var buttonArray=["green","red","yellow","blue"];
var level=0;
var started=false;
$(document).on("keypress",function(){
  if(!started){
  newSequence();
  started=true;
}
})
$(".btn").on("click",function(){
var userChosenColour=this.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
}
);

function newSequence(){

  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var colorChosen=buttonArray[randomNumber];
  gamePattern.push(colorChosen);
  $("#" + colorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(colorChosen);
  level++;
  $("h1").text("Level "+level);
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function playSound(input){
  var audio=new Audio("sounds/"+input+".mp3");
  audio.play();
}

function checkAnswer(currLevel){
  if(userClickedPattern[currLevel]==gamePattern[currLevel]){
    console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
      newSequence();
    },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0;
  userClickedPattern=[];
  gamePattern=[];
  started=false;
}
