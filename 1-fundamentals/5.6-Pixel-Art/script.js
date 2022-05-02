// const colorPalette = document.getElementsByClassName('color-palette');
let initialGrid = 5;
const gridSize = document.getElementById('board-size');
const gridContainer = document.getElementById('pixel-board');
const initialColor = document.getElementById('black');
const colorPalette = document.getElementById('color-palette');

function addGridRow(rowQty, lineNumber) {
  const container = document.getElementById(`line${lineNumber}`);
  for (let i = 1; i <= rowQty; i += 1) {
    const newRow = document.createElement('li');
    newRow.className = 'pixel';
    newRow.style.backgroundColor = 'white';
    container.appendChild(newRow);
  }
}

function addGridLine(lineQty) {
  const container = gridContainer;
  for (let i = 1; i <= lineQty; i += 1) {
    const newLine = document.createElement('ul');
    newLine.id = `line${i}`;
    newLine.className = 'gridLine';
    container.appendChild(newLine);
    addGridRow(lineQty, i);
  }
  return 'GRID LOADED';
}

function randomColor() {
  for (let i = 1; i < colorPalette.children.length; i += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colorPalette.children[i].style = `background-color: rgb(${r}, ${g}, ${b})`;
  }
}

function verifyBoard() {
  const size = gridSize.value;
  // let sizeReturn = 0;
  if (size === '') {
    alert('Board inválido!');
  }
  if (size > 50) {
    gridSize.value = '50';
    return 50;
  }
  if (size < 5) {
    gridSize.value = '5';
    return 5;
  }
  return parseInt(size, 10);
}

function resetGrid() {
  const size = verifyBoard();
  const containerElements = gridContainer.children;
  for (let i = containerElements.length; i > 0; i -= 1) {
    gridContainer.lastChild.remove();
  }
  addGridLine(size);
}

function paintPixel(tgtPixel) {
  const color = window.getComputedStyle(document.querySelector('.selected')).backgroundColor; // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  const pixel = tgtPixel;
  if (tgtPixel.classList.contains('pixel')) {
    pixel.style.backgroundColor = color;
  }
}

function resetColor() {
  const colors = document.getElementsByClassName('color');
  for (let color = 0; color < colors.length; color += 1) {
    if (colors[color].classList.contains('selected')) {
      colors[color].classList.remove('selected');
    }
  }
  initialColor.classList.add('selected');
}

function resetPixelBoard(eventTarget) {
  if (eventTarget.id === 'clear-board') {
    const pixels = document.getElementsByClassName('pixel');
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }
    resetColor();
  }
}

// adaptei a sugestão dada no README do projeto (event bubbling) https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/
function clickEvent(event) {
  const selectedColor = document.querySelector('.selected');

  if (event.target.classList.contains('color')) {
    selectedColor.classList.remove('selected');
    event.target.classList.add('selected');
    console.log(selectedColor.className);
  }
  paintPixel(event.target);
  resetPixelBoard(event.target);
  if (event.target.id === 'generate-board') {
    resetGrid();
  }
}

function firstLoad() {
  if (initialGrid) {
    randomColor();
    addGridLine(initialGrid);
    initialGrid = null;
    return;
  }
  addGridLine(gridSize.value);
}

document.addEventListener('click', clickEvent, false);

window.onload = firstLoad;
