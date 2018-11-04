const submitBtn = document.getElementById('submit-login');

//  Function to login a user
const login = () => {
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  })
    .then(response => response.json())
    .then((data) => {
      const {
        userId, userToken, userType, username,
      } = data;
      localStorage.setItem('user_id', userId);
      localStorage.setItem('user_token', userToken);
      localStorage.setItem('user_type', userType);
      localStorage.setItem('username', username);
      if (userType === 'Customer') {
        window.location.href = '/users/all-food-items.html';
      } else if (userType === 'Admin') {
        window.location.href = '/admin/all-food-items.html';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
});
