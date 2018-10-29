const foodItems = [];
let cartCount = 0;
document.getElementById('cart-count').innerHTML = cartCount;

//  Function to retrieve menu items for guests
const getMenu = () => {
  const menuDiv = document.getElementById('menu-output');
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then((data) => {
      const { menu } = data;
      let output = '';
      menu.forEach((food) => {
        output += `
          <div class="item">
            <div class="item-container">
              <div class="img-container">
                <img class="img-fluid" src="./assets/images/drink-1.jpg" />
              </div>
              <div class="item-details">
                <h3>${food.food_name}</h3>
                <p>Price: <span class="price-figure">&#8358;${food.price}</span></p>
                <p>Description: ${food.description}</p>
                <p>Category: ${food.category_name}</p>
              </div>
              <button class="blue-bg-colour white-text">
                <a href="login.html" class="white-text" data-id="${food.food_id}">Add to cart</a>
              </button>
            </div>
          </div>
        `;
      });
      if (menuDiv === null) {
      } else {
        document.getElementById('menu-output').innerHTML = output;
      }
    });
};

//  function to add new food objects to cart
const addTocart = (newFood) => {
  const result = foodItems.find(food => food.food_id === newFood.food_id);
  if (result) {
    window.alert('You have added this item already');
  } else {
    foodItems.push(newFood);
    cartCount = foodItems.length;
    document.getElementById('cart-count').innerHTML = cartCount;
    const foodItemsstring = JSON.stringify(foodItems);
    localStorage.setItem('food_items', foodItemsstring);
    if (cartCount < 1) {
      document.getElementById('cart-text').innerHTML = 'Your cart is empty';
    } else {
      document.getElementById('cart-text').innerHTML = `Your cart contains ${cartCount} items`;
    }
  }
};

//  function to retrieve menu items for logged in users
const getUsermenu = () => {
  const userMenudiv = document.getElementById('user-output');
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then((data) => {
      const { menu } = data;
      let output = '';
      menu.forEach((food) => {
        output += `
          <div class="item">
            <div class="item-container">
              <div class="img-container">
                <img class="img-fluid" src="${food.image}" />
              </div>
              <div class="item-details">
                <h3>${food.food_name}</h3>
                <p>Price: <span class="price-figure">&#8358;${food.price}</span></p>
                <p>Description: ${food.description}</p>
                <p>Category: ${food.category_name}</p>
              </div>
              <button class="blue-bg-colour white-text">
                <a class="btn-add-cart" class="white-text" data-id="${food.food_id}" data-name="${food.food_name}" data-price="${food.price}" data-image="${food.image}">Add to cart</a>
              </button>
            </div>
          </div>
        `;
      });
      if (userMenudiv === null) {
      } else {
        document.getElementById('user-output').innerHTML = output;
        const flexDiv = document.getElementById('user-output');

        flexDiv.addEventListener('click', (event) => {
          if (event.target && event.target.matches('a.btn-add-cart')) {
            const btnAddtoCart = event.target;
            const foodId = btnAddtoCart.getAttribute('data-id');
            const foodName = btnAddtoCart.getAttribute('data-name');
            const foodPrice = btnAddtoCart.getAttribute('data-price');
            const foodImage = btnAddtoCart.getAttribute('data-image');
            const quantity = 1;
            const newFood = {
              food_id: foodId,
              food_name: foodName,
              food_price: foodPrice,
              food_quantity: quantity,
              food_image: foodImage,
            };
            addTocart(newFood);
          }
        });
      }
    });
};

//  Function to retrieve menu items on admin frontend
const getAdminmenu = () => {
  const adminMenudiv = document.getElementById('admin-output');
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then((data) => {
      const { menu } = data;
      let adminOutput = '';
      menu.forEach((food) => {
        adminOutput += `
        <div class="flex-container">
          <div class="item">
            <div class="item-container">
              <div class="img-container">
                <img class="img-fluid" src="../assets/images/drink-4.jpg" alt="pastery" />
              </div>
              <div class="item-details">
                <h5>ID: ${food.food_id}</h5>
                <h3>${food.food_name}</h3>
                <p>Price: <span class="price-figure">&#8358;${food.price}</span></p>
                <p>Description: ${food.description}</p>
                <p>Category: ${food.category_name}</p>
              </div>
              <button class="green-bg">
                <a href="edit-food-items.html" data-id="${food.food_id} class="white-text">Edit</a>
              </button>
              <button class="red-bg-colour">
                <a href="" class="white-text" data-id="${food.food_id} onclick="modalPopup(); return false;">Delete</a>
              </button>
            </div>
          </div>
        `;
      });
      if (adminMenudiv === null) {
      } else {
        document.getElementById('admin-output').innerHTML = adminOutput;
      }
    });
};

const getLatestmenu = () => {
  const latestMenudiv = document.getElementById('latest-output');
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then((data) => {
      const { menu } = data;
      let output = '';
      menu.slice(-4).forEach((food) => {
        output += `
          <div class="item">
            <div class="item-container">
              <div class="img-container">
                <img class="img-fluid" src="./assets/images/drink-1.jpg" />
              </div>
              <div class="item-details">
                <h3>${food.food_name}</h3>
                <p>Price: <span class="price-figure">&#8358;${food.price}</span></p>
                <p>Description: ${food.description}</p>
                <p>Category: ${food.category_name}</p>
              </div>
              <button class="blue-bg-colour white-text">
                <a href="login.html" class="white-text" data-id="${food.food_id}">Add to cart</a>
              </button>
            </div>
          </div>
        `;
      });
      if (latestMenudiv === null) {
      } else {
        document.getElementById('latest-output').innerHTML = output;
      }
    });
};

window.addEventListener('load', () => {
  getMenu();
  getUsermenu();
  getAdminmenu();
  getLatestmenu();
});
