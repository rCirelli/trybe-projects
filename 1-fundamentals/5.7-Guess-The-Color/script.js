const colorToGuess = document.getElementById('rgb-color');
const options = document.getElementsByClassName('option');
const answerField = document.getElementById('answer');

function generateColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `${r}, ${g}, ${b}`;
}

let colorCode = `(${generateColor()})`;

function generateColorText() {
  colorToGuess.innerText = colorCode;
  colorToGuess.style.backgroundColor = `rgb${colorCode}`;
}

function generateOptions() {
  const randomOption = Math.floor(Math.random() * 7);
  for (let i = 0; i < options.length; i += 1) {
    if (i === randomOption) {
      options[i].style.backgroundColor = `rgb${colorCode}`;
    } else {
      options[i].style.backgroundColor = `rgb(${generateColor()})`;
    }
  }
}

function startGame() {
  generateColorText();
  generateOptions();
}

function resetGame() {
  colorCode = `(${generateColor()})`;
  generateColorText();
  generateOptions();
  answerField.innerText = 'Escolha uma cor';
}

const scoreDisplay = document.getElementById('score');
let score = parseInt(document.getElementById('score').innerText, 10);

function countScore() {
  score += 3;
  scoreDisplay.innerText = score.toString();
}

function checkAnswer(eventTarget) {
  const optionColor = eventTarget.style.backgroundColor;
  if (optionColor === `rgb${colorCode}`) {
    countScore();
    resetGame();
    answerField.innerText = 'Acertou!';
  } else {
    answerField.innerText = 'Errou! Tente novamente!';
  }
}

function clickEvent(event) {
  if (event.target.classList.contains('option')) {
    checkAnswer(event.target);
  }
  if (event.target.id === 'reset-game') {
    resetGame();
  }
}

document.addEventListener('click', clickEvent, false);

window.onload = startGame;
