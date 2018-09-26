/*
JS script to handle form redirects
*/

//  Redirect users to success page after canceling pending orders on modal box
const userPendingOrders = document.getElementById('user-pending');
if (userPendingOrders === null){
} else {
    userPendingOrders.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = '../users/cancel-order-successful.html';
    });
}

//  Redirects users to food page after signing up
const userSignup = document.getElementById('user-Signup');
if (userSignup === null){
} else {
    userSignup.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = './users/all-food-items.html';
    });
}

//  Redirects users to food page after Logging in
const userLogin = document.getElementById('user-login');
if (userLogin === null){
} else {
    userLogin.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href= './users/all-food-items.html';
    });
}

//  Redirects admin to homepage after logging in
const adminLogin = document.getElementById('admin-login');
if (adminLogin === null){
} else {
    adminLogin.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'all-food-items.html';
    });
}

//  Redirects to success page after successfully editing food item
const adminEditfood = document.getElementById('edit-food-form');
if (adminEditfood === null){
} else {
  adminEditfood.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'edit-food-successful.html';
  });
}

//  Redirects to admin decline order confirmation page from viewing specific order
const adminVieworder = document.getElementById('admin-view-order');
if (adminVieworder === null){
} else {
  adminVieworder.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'decline-confirmation.html';
  });
}

//  Redirects to admin decline order confirmation page from pending orders page
const adminPendingorder = document.getElementById('admin-decline-pending');
if(adminPendingorder === null){
} else {
  adminPendingorder.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'decline-confirmation.html';
  });
}

//  Redirects admin back to pending irders after order decline has been successful
const adminDeclineorder = document.getElementById('decline-confirm');
if(adminDeclineorder === null){
} else {
  adminDeclineorder.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'pending-orders.html';
  });
}

//  Redirects to mark order complete successful page
const adminMarkcomplete = document.getElementById('mark-complete');
if(adminMarkcomplete === null){
} else {
  adminMarkcomplete.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'order-complete.html';
  });
}

//  Redirects to food item deleted successfully page after admin deletes item
const adminDeletefood = document.getElementById('all-food-items');
if(adminDeletefood === null){
} else {
  adminDeletefood.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'delete-food-successful.html';
  });
}

//  Redirects to added food successfully home page
const adminAddfood = document.getElementById('add-food-form');
if(adminAddfood === null){
} else {
  adminAddfood.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form submitted');
    window.location.href = 'add-food-successful.html'
  });
}



