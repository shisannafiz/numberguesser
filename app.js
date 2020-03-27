//game values
let min = 2,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number betweem ${min} and ${max}`, 'red');
    return;
  }

  //check if winning number
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
      //game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      //game continues - wrong answer
      //change border color
      guessInput.style.borderColor = 'red';
      //clear input
      guessInput.value = '';
      //set text color
      message.style.color = 'red';
      //tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
    }
  }
});

//game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //set message
  setMessage(msg);

  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//set message
function setMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}
