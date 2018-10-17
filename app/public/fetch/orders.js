
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
        console.log(foodItems);
        output += `
          <tr>
              <td>${order.order_id}</td>
              <td class="text-wrap">${order.full_name}</td>
              <td>&#8358;${order.amount}</td>
              <td><b>food: </b> ${foodItems[0].food_name}, <b>Quantity: </b> ${foodItems[0].quantity} </td>
              <td class="green-text text-wrap">${order.order_status}</td>
              <td>
                <a href="view-order.html">View</a>
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

window.addEventListener('load', () => {
  getAllorders();
});
