var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var rand = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[rand];
  gamePattern.push(randomChosenColour);
  ~setTimeout(function () {
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
  }, 500);
}

function animatePress(color) {
  $("#" + color)
    .addClass("pressed")
    .fadeOut(100)
    .fadeIn(100, function () {
      $("#" + color).removeClass("pressed");
    });
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      updateHighScore();
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    $(".high").text("High Score: " + highScore);
  }
}
