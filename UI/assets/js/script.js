
/* Toggle between adding and removing the "responsive" class to navbar */

const myFunction = () => {
  const x = document.getElementById('myNav');

  if (x.className === 'navbar') {
    x.className += 'responsive';
  } else {
    x.className = 'navbar';
  }
};

const redirectTo = location => {
    window.location.href = location;
  }
