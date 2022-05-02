const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const item = require('../mocks/item');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {

  it('ao chamar saveCartItems com o argumento <ol><li>Item</li></ol>, localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('ao chamar saveCartItems com o argumento item definido, localStorage.setItem é chamado com 2 parametros', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('<ol><li>Item</li></ol>'));
  });

});
