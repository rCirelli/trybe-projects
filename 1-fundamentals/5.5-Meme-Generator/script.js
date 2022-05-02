// const { RuleTester } = require("eslint");
const textInput = document.getElementById('text-input');
const memeContainer = document.getElementById('meme-image-container');
const memeTextContainer = document.getElementById('meme-text');
const imageInput = document.getElementById('meme-insert');
const memeImage = document.getElementById('meme-image');

function updateTextElement() {
  const input = textInput;
  const newText = input.value;
  memeTextContainer.innerText = newText;
}

// https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript
function loadImg() {
  if (!imageInput.files.length) {
    return;
  }
  memeImage.src = URL.createObjectURL(imageInput.files[0]);
}

function templateImg(eventTarget) {
  const templateClick = eventTarget;
  memeImage.src = templateClick.src;
}

function changeMemeBorder(eventTarget) {
  const borderType = eventTarget.id;
  const container = memeContainer;
  container.className = borderType;
  console.log(borderType);
}

function clickEvent(event) {
  if (event.target.classList.contains('chg-border')) {
    changeMemeBorder(event.target);
  }
  if (event.target.classList.contains('templates')) {
    templateImg(event.target);
  }
}

document.addEventListener('click', clickEvent, false);
textInput.addEventListener('keyup', updateTextElement);

window.onload = loadImg;
