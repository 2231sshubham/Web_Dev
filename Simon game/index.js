var btnColor=['red','blue','green','yellow'];

var gamePattern=[];
var userClicked=[];

var level=0;

var i=0;
var j=0;

var started=false;
$(document).keypress(function(){
  if(!started)
  {
    nextSquence();
    started=true;
  }
});

function nextSquence()
{
  level++;

  $("h1").html("Level "+level);

  var rand=Math.floor(Math.random()*4);
  var randomColor = btnColor[rand];

  gamePattern.push(randomColor);
  $("#"+randomColor).fadeOut(150).fadeIn(150);

  userClicked.length=0;
  i=0;
  j=0;
}


$(".btn").click(handler);

function handler()
{
  var userColor=this.id;

  playSound(userColor);
  animatePress(userColor);

  userClicked.push(userColor);

  if(gamePattern[i]===userClicked[j])
  {
    i++;j++;
    if(i===gamePattern.length)
    {
      return nextSquence();
    }
  }
  else
  {
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);

    playSound("wrong");
    $("h1").text("Game over press any key to start again");

    level=0;
    userClicked.length=0;
    gamePattern.length=0;
    started=false;
  }
}

function playSound(color)
{
  var audio= new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(currColor)
{
  $("#"+currColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currColor).removeClass("pressed");
  },100);
}
