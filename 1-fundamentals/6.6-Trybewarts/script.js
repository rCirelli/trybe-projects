const loginEmail = document.getElementById('email-login');
const loginPass = document.getElementById('password-login');
const submitBtn = document.querySelector('#submit-btn');
const agreement = document.querySelector('#agreement');
const firstName = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');
const emailField = document.getElementById('input-email');
const houseField = document.getElementById('house');
const form = document.getElementById('evaluation-form');

function checkCredentials() { // função para checar as credenciais do login
  const email = loginEmail.value === 'tryber@teste.com';
  const password = loginPass.value === '123456';
  if (!email || !password) {
    return alert('Email ou senha inválidos.');
  }
  return alert('Olá, Tryber!');
}

function login(event) { // função que previne o recarregamento da página e reseta o valor dos inputs de login
  event.preventDefault();
  checkCredentials();
  loginEmail.value = null;
  loginPass.value = null;
}

const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', login);

function enviarArquivo() { // Função para habilitar o botão enviar
  submitBtn.disabled = !agreement.checked;
}

agreement.addEventListener('change', enviarArquivo);

const limite = 500;
const texto = document.getElementById('textarea');
const contador = document.getElementById('counter');
contador.innerHTML = limite;

function caracteresRestantes() {
  const tamanho = texto.value.length;
  if (texto.value === '') {
    contador.innerHTML = limite;
  } else {
    contador.innerHTML = limite - tamanho;
  }
}

function checkRadios() { // source https://www.techiedelight.com/get-value-of-selected-radio-button-javascript/
  const selectedRadio = document.querySelector('input[type=radio][name=family]:checked');
  return selectedRadio.value;
}

function checkBoxes() {
  const checkBox = document.querySelectorAll('input[type=checkbox][name=content-checkbox]:checked');
  const boxValues = [];
  for (let box = 0; box < checkBox.length; box += 1) {
    boxValues.push(` ${checkBox[box].value}`);
  }
  return boxValues;
}

function checkScore() {
  const selectedRadio = document.querySelector('input[type=radio][name=rate]:checked');
  return selectedRadio.value;
}

function saveInfo() {
  localStorage.clear();
  localStorage.setItem('name', `${firstName.value} ${lastName.value}`);
  localStorage.setItem('email', emailField.value);
  localStorage.setItem('house', houseField.value);
  localStorage.setItem('family', checkRadios());
  localStorage.setItem('subjects', checkBoxes());
  localStorage.setItem('score', checkScore());
  localStorage.setItem('obs', document.getElementById('textarea').value);
}

function destroyForm() {
  form.innerHTML = '<ul></ul>';
}

function createList() {
  const storageSize = localStorage.length;
  for (let i = 1; i <= storageSize; i += 1) {
    const li = document.createElement('li');
    li.id = i;
    form.firstChild.appendChild(li);
  }
}

function populateList() {
  const name = document.getElementById('1');
  name.innerText = `Nome: ${localStorage.getItem('name')}`;
  const email = document.getElementById('2');
  email.innerText = `Email: ${localStorage.getItem('email')}`;
  const house = document.getElementById('3');
  house.innerText = `Casa: ${localStorage.getItem('house')}`;
  const family = document.getElementById('4');
  family.innerText = `Família: ${localStorage.getItem('family')}`;
  const subjects = document.getElementById('5');
  subjects.innerText = `Matérias: ${localStorage.getItem('subjects')}`;
  const score = document.getElementById('6');
  score.innerText = `Avaliação: ${localStorage.getItem('score')}`;
  const obs = document.getElementById('7');
  obs.innerText = `Observações: ${localStorage.getItem('obs')}`;
}

function submit(event) {
  event.preventDefault();
  saveInfo();
  destroyForm();
  createList();
  populateList();
}

submitBtn.addEventListener('click', submit);
texto.addEventListener('keydown', caracteresRestantes);
texto.addEventListener('keyup', caracteresRestantes);
