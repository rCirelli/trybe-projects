const fetchProducts = async (query) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
