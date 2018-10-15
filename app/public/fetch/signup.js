const submitBtn = document.getElementById('submit-signup');

//  Function to signup a user
const signup = () => {
  const userFullname = document.getElementById('full-name').value;
  const userUsername = document.getElementById('username').value;
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  fetch('https://fast-foodfastapp.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      username: userUsername, fullName: userFullname, email: userEmail, password: userPassword,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const {
        newUser, userToken,
      } = data;
      localStorage.setItem('user_id', newUser.user_id);
      localStorage.setItem('user_token', userToken);
      localStorage.setItem('user_type', newUser.user_type);
      localStorage.setItem('username', newUser.username);
      window.location.href = '/users/all-food-items.html';
    })
    .catch((error) => {
      console.log(error);
    });
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  signup();
});
