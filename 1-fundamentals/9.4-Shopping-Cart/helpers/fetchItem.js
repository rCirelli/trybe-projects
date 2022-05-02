const fetchItem = async (ItemID) => {
  const URL = `https://api.mercadolibre.com/items/${ItemID}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
