
let cartCount = 0;

//  Function to count the number of items in the cart
const countCartitems = () => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  cartCount = cart.length;
  document.getElementById('cart-count').innerHTML = cartCount;
  if (cartCount < 1) {
    document.getElementById('cart-text').innerHTML = 'Your cart is empty';
  } else {
    document.getElementById('cart-text').innerHTML = `Your cart contains ${cartCount} items`;
  }
};

//  Function to calculate the total amount of the items in the cart
const calculateTotalamount = (cart) => {
  let totalAmount = 0;
  cart.forEach((food) => {
    totalAmount += food.food_price * food.food_quantity;
  });
  document.getElementById('total-amount').innerHTML = totalAmount;
};

//  Function to load the total amount of the items in the cart and display it
const loadTotalamount = () => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  let totalAmount = 0;
  cart.forEach((food) => {
    totalAmount += food.food_price * food.food_quantity;
  });
  document.getElementById('total-amount').innerHTML = totalAmount;
};

//  Function to update the quantity of the food item in the cart
const updateItemQuantity = (foodId, qtyValue) => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  const newQty = parseInt(qtyValue, 10);
  let foodFound;
  let itemIndex;
  cart.map((food, index) => {
    if (food.food_id === foodId) {
      foodFound = food;
      itemIndex = index;
    }
  });
  const updatedFooditem = {
    food_id: foodFound.food_id,
    food_name: foodFound.food_name,
    food_price: foodFound.food_price,
    food_quantity: newQty || foodFound.food_quantity,
    food_image: foodFound.food_image,
  };
  cart.splice(itemIndex, 1, updatedFooditem);
  localStorage.setItem('food_items', JSON.stringify(cart));
  calculateTotalamount(cart);
};

//  Function to remove an item from the cart
const removeItem = (foodId) => {
  const foodItems = localStorage.getItem('food_items');
  const cart = JSON.parse(foodItems);
  let itemIndex;
  cart.map((food, index) => {
    if (food.food_id === foodId) {
      itemIndex = index;
    }
  });
  cart.splice(itemIndex, 1);
  localStorage.setItem('food_items', JSON.stringify(cart));
  window.location.reload();
};

//  Function to load all items in the cart to the page
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
          <h3>Quantity: <input type="number" class="txt-quantity" data-id="${food.food_id}" min="0" id="quantity" /></h3>
          <button class="red-bg-colour white-text">
            <a data-id="${food.food_id}" class="white-text remove-item">Remove</a>
          </button>

        </div>
      </div>
        `;
  });
  document.getElementById('checkout-output').innerHTML = output;
  const flexDiv = document.getElementById('checkout-output');
  flexDiv.addEventListener('input', (event) => {
    if (event.target && event.target.matches('input.txt-quantity')) {
      const txtQuantity = event.target;
      const qtyValue = txtQuantity.value;
      const foodId = txtQuantity.getAttribute('data-id');
      updateItemQuantity(foodId, qtyValue);
    }
  });
  flexDiv.addEventListener('click', (event) => {
    if (event.target && event.target.matches('a.remove-item')) {
      const btnRemove = event.target;
      const foodId = btnRemove.getAttribute('data-id');
      const acceptConfirm = window.confirm('Do you really want to remove this item?');
      if (acceptConfirm === true) {
        removeItem(foodId);
      }
    }
  });
};

window.addEventListener('load', () => {
  countCartitems();
  loadCartitems();
  loadTotalamount();
});
