
/* Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon */

const myFunction =() =>{
  const nav = document.getElementById('myNav');

  if (nav.className === 'navbar') {
    nav.className += ' responsive';
  } 
  else {
    nav.className = 'navbar';
  }
};

const redirectTo = location => {
  window.location.href = location;
};

