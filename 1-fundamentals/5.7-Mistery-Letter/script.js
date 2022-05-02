const textInput = document.getElementById('carta-texto');
const inputButton = document.getElementById('criar-carta');
const outputContainer = document.getElementById('carta-gerada');
const counter = document.getElementById('carta-contador');
const styles = { 1: 'newspaper', 2: 'magazine1', 3: 'magazine2' };
const sizes = { 1: 'medium', 2: 'big', 3: 'reallybig' };
const rotations = { 1: 'rotateleft', 2: 'rotateright' };
const skews = { 1: 'skewleft', 2: 'skewright' };

function countCards(array) {
  const cardsArr = array;
  counter.innerText = cardsArr.length;
}

function stylize() {
  const style = styles[`${Math.floor(Math.random() * 3) + 1}`];
  const size = sizes[`${Math.floor(Math.random() * 3) + 1}`];
  const rotation = rotations[`${Math.floor(Math.random() * 2) + 1}`];
  const skew = skews[`${Math.floor(Math.random() * 2) + 1}`];
  console.log(`shadow-lg ${style} ${size} ${rotation} ${skew}`);
  return `${style} ${size} ${rotation} ${skew}`;
}

function changeStyle(e) {
  const eventTarget = e.target;
  eventTarget.className = stylize();
}

function checkInput() {
  const validInput = textInput.value.trim().length; // me baseei no código exemplificado no link a seguir: https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-spaces
  if (validInput === 0) {
    return false;
  }
  return true;
}

function clearOutput() {
  const containerChildren = outputContainer.childNodes;
  for (let i = containerChildren.length; i > 0; i -= 1) {
    outputContainer.lastChild.remove();
  }
}

function addElement(element) {
  const itemToAdd = element;
  outputContainer.appendChild(itemToAdd);
}

function geraCarta() {
  if (!checkInput()) {
    outputContainer.innerText = 'Por favor, digite o conteúdo da carta.';
    return;
  }
  clearOutput();
  const stringsArr = textInput.value.split(' ');
  countCards(stringsArr);
  for (let i = 0; i < stringsArr.length; i += 1) {
    const newItem = document.createElement('span');
    newItem.innerText = stringsArr[i];
    newItem.className = stylize();
    newItem.addEventListener('click', changeStyle);
    addElement(newItem);
  }
}

inputButton.addEventListener('click', geraCarta);
