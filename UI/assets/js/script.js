//  Get and initialize navbar icon
const navIcon = document.getElementById('nav-icon');

//  Toggle between adding and removing the "responsive" class to navbar when user clicks on the icon
const navToggle = () => {
  const nav = document.getElementById('myNav');

  if (nav.className === 'navbar') {
    nav.className += ' responsive';
  } else {
    nav.className = 'navbar';
  }
};

//  On click event listener that triggers nav toggle
navIcon.onclick = () => {
  navToggle();
};
