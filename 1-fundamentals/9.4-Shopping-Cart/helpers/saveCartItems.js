const saveCartItems = (item) => {  
  // const cart = document.querySelector('.cart__items');
  // const cartItems = cart.innerHTML;
  const cartItems = item;
  // localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
