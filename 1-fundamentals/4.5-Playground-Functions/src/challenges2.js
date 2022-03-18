// Auxilia Desafio 11
function countRepeats(objOfNums) {
  let repeats = 0;
  for (let i in objOfNums) {
    if (objOfNums[i] > repeats) {
      repeats = objOfNums[i];
    }
  }
  return repeats;
}

function countArrNum(phoneNumber = []) {
  let count = {};
  for (let i of phoneNumber) {
    if (count[i]) {
      count[i] += 1;
    } else {
      count[i] = 1;
    }
  }
  return count;
}

function checkNumberValue(phoneNumber = []) {
  let invalid = false;
  for (let i of phoneNumber) {
    if (i > 9 || i < 0) {
      invalid = true;
    }
  }
  return invalid;
}

// Desafio 11
function generatePhoneNumber(nums = []) {
  let phoneNumber = nums;
  let ddd = phoneNumber.slice(0, 2).join('');
  let firstPart = phoneNumber.slice(2, 7).join('');
  let secondPart = phoneNumber.slice(7).join(''); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  if (nums.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  if (countRepeats(countArrNum(phoneNumber)) >= 3 || checkNumberValue(phoneNumber)) {
    return 'não é possível gerar um número de telefone com esses valores';
  }
  return `(${ddd}) ${firstPart}-${secondPart}`;
}

// Auxilia Desafio 12
function checkMinus(lineA = NaN, lineB = NaN, lineC = NaN) {
  const MinusSides = [
    Math.abs(lineA - lineB),
    Math.abs(lineA - lineC),
    Math.abs(lineB - lineC),
  ];

  for (let minus of MinusSides) {
    if (lineA < minus || lineB < minus || lineC < minus) {
      return false;
    }
  }
  return true;
}

function checkSum(lineA = NaN, lineB = NaN, lineC = NaN) {
  const sumSides = [
    Math.abs(lineA + lineB),
    Math.abs(lineA + lineC),
    Math.abs(lineB + lineC),
  ];

  for (let sum of sumSides) {
    if (lineA > sum || lineB > sum || lineC > sum) {
      return false;
    }
  }
  return true;
}

// Desafio 12
function triangleCheck(lineA = NaN, lineB = NaN, lineC = NaN) {
  const sumCondition = checkSum(lineA, lineB, lineC);
  const minusCondition = checkMinus(lineA, lineB, lineC);

  if (sumCondition === false || minusCondition === false) {
    return false;
  }
  return true;
}

// Desafio 13
function hydrate(a = '') {
  const drinksQty = a.match(/\d+/g); // adaptei a resposta desse post para usar o match() : https://stackoverflow.com/questions/1623221/how-to-find-a-number-in-a-string-using-javascript
  let drinksSum = 0;
  for (let i = 0; i < drinksQty.length; i += 1) {
    drinksSum += parseInt(drinksQty[i], 10); // usei o parseInt() para converter a string com a quantidade em número para poder somar : https://www.w3schools.com/jsref/jsref_parseint.asp
  }
  if (drinksSum === 1) {
    return `${drinksSum} copo de água`;
  }
  return `${drinksSum} copos de água`;
}
console.log(hydrate('30 cerveja, 2 cachaça e 5 vinhos'));

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
