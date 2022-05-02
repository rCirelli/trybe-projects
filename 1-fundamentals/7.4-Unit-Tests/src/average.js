/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

const checkNumber = (array) => {
  for (let item of array) {
    if (typeof item !== 'number') {
      return typeof item;
    }
  }
  return 'number';
};

const sum = (total, num) => total + num;

// utilizando o metodo reduce descrito na documentação: https://www.w3schools.com/jsref/jsref_reduce.asp
const average = (array) => {
  if (array.length < 1 || checkNumber(array) !== 'number') {
    return undefined;
  }
  return Math.round(array.reduce(sum) / array.length);
};

console.log(average([-11, 2, 5]));

module.exports = average;
