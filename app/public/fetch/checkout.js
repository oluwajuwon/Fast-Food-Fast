
let cartCount = 0;

const countCartitems = () => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  cartCount = cart.length;
  document.getElementById('cart-count').innerHTML = cartCount;
};

const loadCartitems = () => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  let output = '';
  cart.forEach((food) => {
    output += `
        <div class="item">
        <div class="item-container">
          <div class="img-container">
            <img class="img-fluid" src="${food.food_image}" />
          </div>
          <div class="item-details">
            <h3>${food.food_name}</h3>
            <p><span class="price-figure">&#8358;${food.food_price}</span></p>
          </div>
          <h3>Quantity: <input type="number" min="0" id="quantity" /></h3>
          <button class="red-bg-colour white-text">
            <a href="#" class="white-text">Remove</a>
          </button>

        </div>
      </div>
        `;
  });
  document.getElementById('checkout-output').innerHTML = output;
};

window.addEventListener('load', () => {
  countCartitems();
  loadCartitems();
});
