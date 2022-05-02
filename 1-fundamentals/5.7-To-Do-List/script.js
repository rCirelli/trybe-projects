const inputField = document.getElementById('texto-tarefa');
// const btnInput = document.getElementById('criar-tarefa');
const listElement = document.getElementById('lista-tarefas');
// const listItem = document.getElementsByClassName('list-item');
// const btnDelSelected = document.getElementById('remover-selecionado');
const btnMoveUp = document.getElementById('mover-cima');
const btnMoveDown = document.getElementById('mover-baixo');
// const btnClearList = document.getElementById('apaga-tudo');
// const btnSaveList = document.getElementById('salvar-tarefas');
// const savedList = localStorage;

function createLiElement() {
  if (inputField.value === '') {
    return;
  }
  const parent = listElement;
  const newItem = document.createElement('li');
  newItem.textContent = inputField.value;
  newItem.classList.add('list-item');
  parent.appendChild(newItem);
  inputField.value = '';
  inputField.focus();
}

function deselectItem() {
  const item = document.querySelector('.selected');
  if (item) {
    item.classList.remove('selected');
  }
}

function selectListItem(eventTarget) {
  const target = eventTarget;
  if (target.classList.contains('list-item')) {
    deselectItem();
    target.classList.add('selected');
  }
}

function incompleteItem(eventTarget) {
  const item = eventTarget;
  if (item.classList.contains('completed')) {
    item.classList.remove('completed');
  }
}

function completeItem(eventTarget) {
  const item = eventTarget;
  if (item.classList.contains('completed')) {
    incompleteItem(item);
    return;
  }
  if (item.classList.contains('list-item')) {
    deselectItem();
    item.classList.add('completed');
  }
}

function clearList(eventTarget) {
  if (eventTarget.id === 'apaga-tudo' || eventTarget.innerText === 'Limpar Lista ✘') {
    const list = listElement;
    list.innerHTML = '';
  }
}

function clearCompleted() {
  const completedItems = document.getElementsByClassName('completed');

  for (let i = completedItems.length - 1; i >= 0; i -= 1) {
    const item = completedItems[i];
    if (item.classList.contains('completed')) {
      item.remove();
    }
  }
}

// usei como exemplo o código do link abaixo, e procurei saber mais sobre after() e vefore()
// https://www.codegrepper.com/code-examples/javascript/change+element+order+in+div+javascript
function moveUp() {
  const selectedItem = document.querySelector('.selected');
  if (!selectedItem || !selectedItem.previousElementSibling) {
    return;
  }
  selectedItem.after(selectedItem.previousElementSibling);
}

function moveDown() {
  const selectedItem = document.querySelector('.selected');
  if (!selectedItem || !selectedItem.nextElementSibling) {
    return;
  }
  selectedItem.before(selectedItem.nextElementSibling);
}

function removeSelected(eventTarget) {
  if (eventTarget.id === 'remover-selecionado' || eventTarget.innerText === '✖') {
    const item = document.querySelector('.selected');
    listElement.removeChild(item);
  }
}

function saveList(eventTarget) {
  if (eventTarget.id === 'salvar-tarefas' || eventTarget.innerText === 'Salvar Lista ✔') {
    localStorage.clear();
    const list = listElement;
    for (let i = 0; i < list.children.length; i += 1) {
      localStorage.setItem(i + 1, list.children[i].innerText);
      localStorage.setItem(`${i + 1}:status`, list.children[i].classList);
    }
  }
}

function restoreList() {
  const parent = listElement;
  const list = localStorage;
  const storageSize = localStorage.length / 2;
  for (let i = 1; i <= storageSize; i += 1) {
    const newItem = document.createElement('li');
    newItem.textContent = list.getItem(i);
    // newItem.classList.add('list-item');
    newItem.className = list.getItem(`${i}:status`);
    parent.appendChild(newItem);
  }
  inputField.value = '';
  inputField.focus();
}

function clickEvent(event) {
  if (event.target.id === 'criar-tarefa' || event.target.innerText === 'Adicionar ✔') {
    createLiElement();
  }
  if (event.target.id === 'remover-finalizados' || event.target.innerText === 'Limpar Completos⛶') {
    clearCompleted();
  }
  selectListItem(event.target);
  clearList(event.target);
  removeSelected(event.target);
  saveList(event.target);
}

function dblClickEvent(event) {
  completeItem(event.target);
}

function enterEvent(event) {
  if (event.keyCode === 13) {
    createLiElement();
  }
}

btnMoveUp.addEventListener('click', moveUp, false);
btnMoveDown.addEventListener('click', moveDown, false);
document.addEventListener('keypress', enterEvent, false);
document.addEventListener('dblclick', dblClickEvent, false);
document.addEventListener('click', clickEvent, false);
window.onload = restoreList;
