//  Get and initialize navbar icon
const navIcon = document.getElementById('nav-icon');

//  On click event listener that triggers nav toggle
navIcon.onclick = () => {
  navToggle();
}

//  Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon
const navToggle =() =>{
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

