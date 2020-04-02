let buttonsColors = ["yellow", "red", "green", "blue"];

let gamePattern = [],
  userClickedPattern = [];

let level = 0;
let levelStart = false;

$(document).keypress(() => {
  if (!levelStart) {
    $('#level-title').text(`level ${level}`);
    nextSequence();
    levelStart = true;
  }
});

$('.btn').click(event => {
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Call checkAnswer() after user user clicked his answer
  checkAnswer(userClickedPattern.length-1);
});

const nextSequence = () => {
  $('#level-title').text(`level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4); // Generate new random number between 0 - 3
  let randomChosenColor = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level ++;
}

const playSound = color => {
  let audio = new Audio (`./sounds/${color}.mp3`);
  audio.play();
}

const animatePress = currentColor => {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout (() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 1000);
}

checkAnswer = currentLevel => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $('body').addClass('game-over');
    $('#level-title').text("Game Over (press any key to restart)");
    setTimeout(() => {
      $('body').removeClass("game-over");
      startOver(); // Call startOver() when user gets the sequence wrong
    }, 2000)
  }
}

const startOver = () => {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  levelStart = false;
}







// $('button').click(event => {
//   let userChosenColor = event.target.id;
//   console.log("hello");
// });
