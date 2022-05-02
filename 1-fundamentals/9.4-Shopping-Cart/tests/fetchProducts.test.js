require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {

  it('tipo de fecthProducts deve ser "funcionn"', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao chamar fetchProducts com o argumento "computador" fetch deve ser chamado', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamar fetchProducts com o argumento "computador" fetch usa o endpoint determinado', () => {
    const expectedEndpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });

  it('retorno de fetchProducts com o argumento "computador" é igual ao objeto determinado', async () => {
    const result = await fetchProducts('computador');
    expect(result).toMatchObject(computadorSearch.results);
  });

  it('ao chamar fetchProducts sem argumentos retorna erro: "You must provide an url"', async () => {
    // const failedRequest = await fetchProducts();
    // expect(failedRequest).toEqual(new Error('You must provide an url'));
    return expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });

});
