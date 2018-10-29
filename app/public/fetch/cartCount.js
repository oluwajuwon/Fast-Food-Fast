const countCartitems = () => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  cartCount = cart.length;
  document.getElementById('cart-count').innerHTML = cartCount;
};

window.addEventListener('load', countCartitems());
