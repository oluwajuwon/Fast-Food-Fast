
const username = localStorage.getItem('username');
document.getElementById('username').innerHTML = username;

const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.clear();
  window.location.href = '../login.html';
});
