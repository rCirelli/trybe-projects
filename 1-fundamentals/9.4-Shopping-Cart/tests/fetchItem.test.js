require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('tipo de fetchItem deve ser "function"', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('ao chamar fetchItem com o argumento "MLB1615760527" deve chamar fetch', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('ao chamar fetchItem com o argumento "MLB1615760527" deve usar o endpoint determinado', () => {
    const expectedEndpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });

  it('retorno de fetchItem com o argumento "MLB1615760527" é igual ao objeto determinado', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toMatchObject(item);
  });

  it('ao chamar fetchProducts sem argumentos retorna erro: "You must provide an url"', async () => {
    return expect(fetchItem()).rejects.toEqual(new Error('You must provide an url'));
  });

});
