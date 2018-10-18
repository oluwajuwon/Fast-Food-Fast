
const myToken = localStorage.getItem('user_token');

const getAllorders = () => {
  const orderDiv = document.getElementById('order-output');
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': myToken,
    },
  }).then(response => response.json())
    .then((data) => {
      const { orders } = data;
      let output = `
      <tr>
      <th>Order ID</th>
      <th>Customer's name</th>
      <th>Total Amount Paid</th>
      <th>items</th>
      <th>Status</th>
      <th>Manage</th>
    </tr>`;
      orders.forEach((order) => {
        const foodItems = JSON.parse(order.food_items);
        output += `
          <tr>
              <td>${order.order_id}</td>
              <td class="text-wrap">${order.full_name}</td>
              <td>&#8358;${order.amount}</td>
              <td><b>food: </b> ${foodItems[0].food_name}, <b>Quantity: </b> ${foodItems[0].quantity} </td>
              <td class="green-text text-wrap">${order.order_status}</td>
              <td>
                <a href="view-order.html?order_id=${order.order_id}">View</a>
              </td>
            </tr>
        `;
      });
      if (orderDiv === null) {
      } else {
        document.getElementById('order-output').innerHTML = output;
      }
    });
};

const getOrderHistory = () => {
  const orderHistoryDiv = document.getElementById('order-history-output');
  const myId = localStorage.getItem('user_id');
  if (orderHistoryDiv === null) {
  } else {
    fetch(`https://fast-foodfastapp.herokuapp.com/api/v1/users/${myId}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': myToken,
      },
    }).then(response => response.json())
      .then((data) => {
        const { myOrders } = data;
        let output = '';
        myOrders.forEach((order) => {
          const foodItems = JSON.parse(order.food_items);
          output += `
              <div class="item">
              <div class="item-container">
                <div class="img-container">
                  <img class="img-fluid" src="../assets/images/pastery-4.jpg" />
                </div>
                <div class="item-details">
                  <p><b>Order Date/Time: </b>${order.created_at}</p>
                  <p><b>Items:</b>&nbsp; <b>Item name:</b> ${foodItems[0].food_name}, <b>Quantity: </b> ${foodItems[0].quantity} </p>
                  <p><b>Amount Paid: </b>&#8358;${order.amount}</p>
                  <p>
                    <b>Status: </b>
                    <span> ${order.order_status}</span>
                  </p>
                </div>
              </div>
            </div>
          `;
        });
        if (orderHistoryDiv === null) {
        } else {
          document.getElementById('order-history-output').innerHTML = output;
        }
      });
  }
};

const getSpecificOrder = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const orderId = url.searchParams.get('order_id');
  const specificOrderDiv = document.getElementById('specific-order');
  fetch(`https://fast-foodfastapp.herokuapp.com/api/v1/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': myToken,
    },
  }).then(response => response.json())
    .then((data) => {
      const { orderFound } = data;
      let output = '';
      // const foodItems = JSON.parse(orderFound.food_items);
      output += `
        <div class="order-details">
          <p><b>Order ID: </b> ${orderFound.order_id}</p>
          <p><b>Order date and time:</b>${orderFound.created_at} </p>
          <h3>Items:</h3>
          <p><b>food: </b> ${orderFound.food_items[0].food_name}, <b>Quantity: </b> ${orderFound.food_items[0].quantity} </p>
          <p><b>Amount Paid:</b> &#8358;${orderFound.amount_paid}</p>
          <h3>Order by: ${orderFound.full_name}</h3>
          <button class="green-bg white-text">
            <a id="btn-accept-order" class="white-text">Accept</a>
          </button>
          <button class="red-bg-colour white-text">
            <a onclick="modalPopup()" class="white-text">Decline</a>
          </button>
        </div>
        `;
      if (specificOrderDiv === null) {
      } else {
        document.getElementById('specific-order').innerHTML = output;
      }
    });
};

window.addEventListener('load', () => {
  const userType = localStorage.getItem('user_type');
  if (userType === 'Admin') {
    getAllorders();
    getSpecificOrder();
  }
  getOrderHistory();
});
