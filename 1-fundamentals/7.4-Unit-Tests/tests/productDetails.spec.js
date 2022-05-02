const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste se productDetails é uma função.
    expect(typeof productDetails).toBe('function');

    // Teste se o retorno da função é um array.
    expect(productDetails('test1', 'test1').length).toBeGreaterThan(1);

    // Teste se o array retornado pela função contém dois itens dentro.
    expect(productDetails('test1', 'test2').length).toBe(2);

    // Teste se os dois itens dentro do array retornado pela função são objetos.
    expect(typeof productDetails('test1', 'test2')[0]).toBe('object');
    expect(typeof productDetails('test1', 'test2')[1]).toBe('object');

    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    expect(productDetails('test1', 'test2')[0]).not.toMatchObject(productDetails('test1', 'test2')[1]);

    // Teste se os dois productIds terminam com 123.
    const numberAtEndOfString = (string) => {
      const index1 = string.lastIndexOf('123');
      const index2 = index1 + 1;
      const index3 = index1 + 2;
      return `${string[index1]}${string[index2]}${string[index3]}`;
    }
    expect(numberAtEndOfString(productDetails('test1', 'test2')[0].details.productId)).toMatch('123');
    expect(numberAtEndOfString(productDetails('test1', 'test2')[1].details.productId)).toMatch('123');
  });
});
