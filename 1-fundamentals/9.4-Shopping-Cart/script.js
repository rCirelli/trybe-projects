const cart = document.querySelector('.cart__items');

const loadingAnimation = `<div class="loading-container">
<h4 class="loading">carregando...</h4>
<svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20"/></svg>
</div>`;

const loadingContainer = document.querySelector('.items');

function saveCartObj(itemObj) {
  if (localStorage.length > 0) {
    const storedItems = JSON.parse(localStorage.getItem('cartItemsObj'));
    storedItems.push(itemObj);
    localStorage.setItem('cartItemsObj', JSON.stringify(storedItems));
  } else {
    const storageArray = [];
    storageArray.push(itemObj);
    localStorage.setItem('cartItemsObj', JSON.stringify(storageArray));
  }
  saveCartItems();
}

const getSavedCartObj = () => {
  getSavedCartItems();
  if (localStorage.length > 0) {
    const storage = localStorage.getItem('cartItemsObj');
    const storedItems = JSON.parse(storage);
    return storedItems;
  }
};

function displayLoading() {
  loadingContainer.innerHTML = loadingAnimation;
}

function hideLoading() {
  loadingContainer.innerHTML = '';
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function addProductsList(query = 'computador') {
  displayLoading();
  const container = document.querySelector('.items');
  const productsArr = await fetchProducts(query);
  hideLoading();
  productsArr.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const item = createProductItemElement({ sku, name, image });
    container.appendChild(item);
  });
}

// ! Usada quando o carrinho é salvo com o obj do item
function sumTotalPrice() {
  const items = getSavedCartObj();
  const sum = items.reduce((acc, { price }) => acc + price, 0);
  const total = Math.round((sum + Number.EPSILON) * 100) / 100; // source: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return total;
  // return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function displayTotal() {  
  const storedItems = JSON.parse(localStorage.getItem('cartItemsObj'));
  const totalContainer = document.querySelector('.total-container');
  const totalElement = document.querySelector('.total-price');  
  if (storedItems && storedItems.length > 0) {
    totalContainer.style.display = 'flex';
    totalElement.innerText = sumTotalPrice();
  } else {
    totalContainer.style.display = 'none';
  }
}

// ! Usada quando o carrinho é salvo com o obj do item
const updateCartItems = (itemId) => {
  saveCartItems();
  const storedItems = JSON.parse(localStorage.getItem('cartItemsObj'));
  if (storedItems) {
    const newArray = storedItems.filter(({ id }) => id !== itemId);
    // localStorage.clear();
    localStorage.setItem('cartItemsObj', JSON.stringify(newArray));
  }
};

// ! usada quando o carrinho é salvo pelo html
// const updateCartItems = (event) => {
//   const item = event.target;
//   item.remove();
//   saveCartItems();
// };

function cartItemClickListener(event) {
  const item = event.target;
  const { id } = item;
  item.remove();
  updateCartItems(id);
  displayTotal();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function appendCartItem(itemObj) {
  const container = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = itemObj;
  container.appendChild(createCartItemElement({ sku, name, salePrice }));
}

async function addItemToCart(event, savedItem) {
  let itemId;
  let itemObj;
  if (!savedItem) {
    itemId = getSkuFromProductItem(event.target.parentNode);
    itemObj = await fetchItem(itemId);
    appendCartItem(itemObj);
    saveCartObj(itemObj);
  } else {
    itemId = savedItem.id;
    itemObj = savedItem;
    appendCartItem(itemObj);
  }
  displayTotal();
}

function loadCart() {
  const storedItemsObj = getSavedCartObj();
  if (storedItemsObj) {
    // ! Se o carrinho foi salvo com os objetos dos itens
    storedItemsObj.forEach((item) => {
      addItemToCart('', item);
    });

    // ! Se o carrinho foi salvo com o HTML
    // cart.innerHTML = storedItems;
  }
}

function clearCart() {
  cart.innerHTML = '';
  localStorage.clear();
  displayTotal();
}

window.onload = () => {
  addProductsList();
  loadCart();

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) addItemToCart(event);
    if (event.target.classList.contains('empty-cart')) clearCart();

    // ! usada quando o carrinho é salvo pelo html
    // if (event.target.classList.contains('cart__item')) updateCartItems(event);
  });
};
