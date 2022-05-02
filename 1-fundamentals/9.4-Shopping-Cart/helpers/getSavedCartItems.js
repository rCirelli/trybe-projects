const getSavedCartItems = () => {
  const storage = localStorage.getItem('cartItems');
  // const storedItems = JSON.parse(storage);
  // return storedItems;
  return storage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
