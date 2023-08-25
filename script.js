const keys = document.querySelectorAll('.key');
const box = document.getElementById('box');
const overlay = document.getElementById('overlay');
const popup = document.querySelector('.popup');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');


musicControl.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.innerText = '🎵';
    } else {
        backgroundMusic.pause();
        musicIcon.innerText = '🔇';
    }
});

keys.forEach(key => {
  // For desktop devices
  key.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', key.dataset.aspect);
  });

  // For mobile devices
  key.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.target.classList.add('dragging'); // Add a class for styling
    e.target.touchX = e.touches[0].clientX;
    e.target.touchY = e.touches[0].clientY;
  });

  key.addEventListener('touchmove', (e) => {
    if (!e.target.classList.contains('dragging')) return;

    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const offsetX = touchX - e.target.touchX;
    const offsetY = touchY - e.target.touchY;

    e.target.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  key.addEventListener('touchend', (e) => {
    if (!e.target.classList.contains('dragging')) return;

    e.target.classList.remove('dragging');
    e.target.style.transform = '';

    // Use the touch coordinates to determine drop location and logic
    // (Similar to your existing drop logic)
  });
});




keys.forEach(key => {
  key.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', key.dataset.aspect);
  });
});

box.addEventListener('dragover', (e) => {
  e.preventDefault();
});

box.addEventListener('drop', (e) => {
  e.preventDefault();
  const aspect = e.dataTransfer.getData('text/plain');
  const draggedKey = document.querySelector(`[data-aspect="${aspect}"]`);
  
  if (aspect && draggedKey) {

 
      box.innerHTML = `<div class="treasure-open shrink"> </div>`;
      draggedKey.style.display = 'none';
   
      checkAllKeysInBox();
      
  

  }
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
