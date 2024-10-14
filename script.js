const dosenProfiles = document.querySelectorAll('.dosenprofil');

// Function to apply margins or remove them based on screen width
function adjustMargins() {
  const screenWidth = window.innerWidth;

  dosenProfiles.forEach((profile, index) => {
    if (screenWidth <= 768) {
      // If in mobile mode, remove margin-left
      profile.style.marginLeft = '50px';
    } else {
      // Calculate the margin left based on the index
      const marginLeft = index * 20; 
      profile.style.marginLeft = `${marginLeft}px`;
    }
  });
}

// Initial call to set margins based on current screen size
adjustMargins();

// Optional: Add event listener to adjust margins on window resize
window.addEventListener('resize', adjustMargins);

let totalProfiles = document.querySelectorAll('.dosenprofil').length;
let dosenContainer = document.querySelector('.dosen');
let firstProfileElement = document.getElementById('dosen1');
let indicators = document.querySelectorAll('.indicator');
let currentProfile = 1;

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', function() {
    let targetProfile = document.getElementById(this.dataset.target);
    let currentProfileElement = document.getElementById(`dosen${currentProfile}`);

    currentProfileElement.classList.add('slide-out');

    setTimeout(function() {
      currentProfileElement.classList.remove('slide-out');
      dosenContainer.prepend(currentProfileElement); // Move to the beginning of the container
    }, 500);

    currentProfile = index + 1;
    targetProfile.style.display = 'flex';

    // Add active class to the corresponding indicator button
    indicators.forEach((indicator) => indicator.classList.remove('active'));
    this.classList.add('active');
  });
});

// Update the active indicator button when the next button is clicked
document.getElementById('next-btn').addEventListener('click', function() {
  let currentProfileElement = document.getElementById(`dosen${currentProfile}`);
  let nextProfileElement = document.getElementById(`dosen${(currentProfile % totalProfiles) + 1}`);

  currentProfileElement.classList.add('slide-out');

  setTimeout(function() {
    currentProfileElement.classList.remove('slide-out');
    dosenContainer.prepend(currentProfileElement); // Move to the beginning of the container
  }, 500);

  currentProfile = (currentProfile % totalProfiles) + 1;
  nextProfileElement.style.display = 'flex';

  // Update the active indicator button
  indicators.forEach((indicator) => indicator.classList.remove('last-child'));
  indicators[currentProfile - 1].classList.add('active');
});

document.getElementById('next-btn').addEventListener('click', () => {
  document.querySelector('.indicator.last-child').classList.remove('last-child');
  // or
  document.querySelector('.indicator:last-child').style.backgroundColor = '';
});

