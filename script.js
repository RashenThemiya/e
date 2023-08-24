
const overlay = document.getElementById('overlay');
const popup = document.querySelector('.popup');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');
const keys = document.querySelectorAll('.key');
const box = document.getElementById('box');
let activeKey = null;

// Function to handle touch start
function handleTouchStart(e) {
  e.preventDefault();
  activeKey = this;
  const touch = e.touches[0];
  const offsetX = touch.clientX - activeKey.getBoundingClientRect().left;
  const offsetY = touch.clientY - activeKey.getBoundingClientRect().top;
  activeKey.style.transition = 'none';
  activeKey.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// Function to handle touch move
function handleTouchMove(e) {
  if (!activeKey) return;
  const touch = e.touches[0];
  const newX = touch.clientX - activeKey.offsetWidth / 2;
  const newY = touch.clientY - activeKey.offsetHeight / 2;
  activeKey.style.left = `${newX}px`;
  activeKey.style.top = `${newY}px`;
}

// Function to handle touch end
function handleTouchEnd() {
  if (!activeKey) return;
  activeKey.style.transition = '';
  activeKey.style.transform = '';
  activeKey = null;

  checkAllKeysInBox();
}

box.addEventListener('touchmove', (e) => {
  e.preventDefault();
});

box.addEventListener('touchend', (e) => {
  e.preventDefault();
  if (!activeKey) return;
  const aspect = activeKey.dataset.aspect;

  box.innerHTML = `<div class="treasure-open shrink"></div>`;
  activeKey.style.display = 'none';
  activeKey = null;

  checkAllKeysInBox();
});

keys.forEach(key => {
  key.addEventListener('touchstart', handleTouchStart);
  key.addEventListener('touchmove', handleTouchMove);
  key.addEventListener('touchend', handleTouchEnd);

  key.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', key.dataset.aspect);
  });
});


function checkAllKeysInBox() {
  const remainingKeys = Array.from(keys).filter(key => key.style.display !== 'none');
  
  if (remainingKeys.length === 0) {
    setTimeout(() => {
      showWinPopup();
    }, 1000);
  }
}

function showWinPopup() {
  overlay.style.display = 'flex';
  popup.classList.add('animate-popup');
}

popup.addEventListener('animationend', () => {
  popup.classList.remove('animate-popup');
});


//count down
(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "08/31/",
      criket = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > criket) {
    criket = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(criket).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "It's my criket!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());
