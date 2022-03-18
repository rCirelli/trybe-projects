// Desafio 1
function compareTrue(a = Boolean, b = Boolean) {
  if (a && b) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(a = 0, b = 0) {
  const width = a;
  const height = b;
  if (typeof width === 'number' && typeof height === 'number') {
    return (width * height) / 2;
  }
  return 'Insert Only Numbers as Parameters';
}

// Desafio 3
function splitSentence(a = '') {
  const string = a;
  if (typeof string === 'string') {
    let splitString = string.split(' '); // uso da função split visto aqui como referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split
    return splitString;
  }
  return 'Insert Only String as Parameter';
}

// Desafio 4
function concatName(...args) {
  // na linha de código abaixo e na definição dos parametros da função, usei informação retirada da seguinte documentação, para ter como entrada um array com todos parametros passados na chamada da função: https://github.com/airbnb/javascript#es6-rest
  const stringArray = args.toString().split(','); // converter todo o conteúdo do array para string, depois convertendo novamente em array, evitando de fazer um for só para checar se todos os elemtos do array são strings: https://www.w3schools.com/jsref/jsref_tostring_array.asp
  const firstItem = stringArray[0];
  const lastItem = stringArray[stringArray.length - 1];
  return `${lastItem}, ${firstItem}`;
}

// Desafio 5
function footballPoints(wins = 0, ties = 0) {
  let points = 0;
  if (typeof wins === 'number' && typeof ties === 'number') {
    points = wins * 3 + ties * 1;
    return points;
  }
  return 'Insert 2 numbers as parameters';
}

// Desafio 6
function highestCount(a) {
  const numbers = a;
  let countBigNum = 0;
  let biggestNum = numbers[0];
  for (let divided = 0; divided < numbers.length; divided += 1) {
    if (numbers[divided] > biggestNum) {
      biggestNum = numbers[divided];
      countBigNum = 1;
    } else if (biggestNum === numbers[divided]) {
      countBigNum += 1;
    }
  }
  return countBigNum;
}

// Desafio 7
function catAndMouse(mouse = NaN, cat1 = NaN, cat2 = NaN) {
  // usei esse post como referencia para declarar uma variavel numerica sem valor usando NaN: https://stackoverflow.com/questions/56405171/how-to-declare-an-empty-numeric-number-value-in-javascript
  let relativeDistance1 = Math.abs(cat1 - mouse); // verifiquei na documentação como transformar um número num valor absoluto, independente de ser negativo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  let relativeDistance2 = Math.abs(cat2 - mouse);
  let message = '';
  if (relativeDistance1 < relativeDistance2) {
    message = 'cat1';
  } else if (relativeDistance2 < relativeDistance1) {
    message = 'cat2';
  } else {
    message = 'os gatos trombam e o rato foge';
  }
  return message;
}

// Auxiliar do Desafio 8
function divisibleBy3or5(a = NaN) {
  let message = ['0', '0'];
  if (a % 3 === 0) {
    message[0] = 3;
  }
  if (a % 5 === 0) {
    message[1] = 5;
  }
  return message.join('/');
}

// Desafio 8
function fizzBuzz(a = []) {
  const numbers = a;
  let fizzArray = [];
  for (let i = 0; i < a.length; i += 1) {
    switch (divisibleBy3or5(numbers[i])) {
    case '3/0':
      fizzArray.push('fizz');
      break;
    case '0/5':
      fizzArray.push('buzz');
      break;
    case '3/5':
      fizzArray.push('fizzBuzz');
      break;
    default:
      fizzArray.push('bug!');
    }
  }
  return fizzArray;
}

// Auxilia Desafio 9
function swapVowel(arg = '') {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (vowels.indexOf(arg) < 0) {
    return arg;
  }
  let swap = vowels.indexOf(arg) + 1;
  return swap;
}

function unSwapVowel(arg = NaN) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (arg > 0 && arg <= 5) {
    let unSwap = vowels[arg - 1];
    return unSwap;
  }
  return arg;
}

// Desafio 9
function encode(a = '') {
  const string = a.split('');
  let encodedString = [];
  for (let i = 0; i < string.length; i += 1) {
    encodedString.push(swapVowel(string[i]));
  }
  return encodedString.join('');
}

function decode(a = '') {
  const string = a.split('');
  let decodedString = [];
  for (let i = 0; i < string.length; i += 1) {
    decodedString.push(unSwapVowel(string[i]));
  }
  return decodedString.join('');
}

// Desafio 10
function techList(a = [], b = '') {
  const techs = a.sort();
  const name = b;
  let techListName = [];
  if (a.length === 0) {
    return 'Vazio!';
  }
  for (let i = 0; i < techs.length; i += 1) {
    let newValue = { tech: techs[i], name };
    techListName.push(newValue);
  }
  return techListName;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
