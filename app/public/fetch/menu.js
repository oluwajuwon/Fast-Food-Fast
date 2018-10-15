//  Function to retrieve menu items for guests
const getMenu = () => {
  const menuDiv = document.getElementById('output');
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
        <div class="flex-container">
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
        document.getElementById('output').innerHTML = output;
      }
    });
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
        <div class="flex-container">
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
                <a href="confirm-order.html" class="white-text" data-id="${food.food_id}">Add to cart</a>
              </button>
            </div>
          </div>
        `;
      });
      if (userMenudiv === null) {
      } else {
        document.getElementById('user-output').innerHTML = output;
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
        <div class="flex-container">
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
