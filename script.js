const keys = document.querySelectorAll('.key');
const box = document.getElementById('box');
const overlay = document.getElementById('overlay');
const popup = document.querySelector('.popup');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.innerText = '🎵';
    } else {
        backgroundMusic.pause();
        musicIcon.innerText = '🔇';
    }
}

musicControl.addEventListener('click', toggleMusic);

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', this.dataset.aspect);
}

keys.forEach(key => {
    key.addEventListener('dragstart', handleDragStart);
});

box.addEventListener('dragover', (e) => {
    e.preventDefault();
});

box.addEventListener('drop', (e) => {
    e.preventDefault();
    const aspect = e.dataTransfer.getData('text/plain');
    const draggedKey = document.querySelector(`[data-aspect="${aspect}"]`);
  
    if (aspect && draggedKey) {
        box.innerHTML = `<div class="treasure-open shrink"></div>`;
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

// Count down
(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

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
  
    const countDown = new Date(criket).getTime(),
        x = setInterval(function() {    
            const now = new Date().getTime(),
                  distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            if (distance < 0) {
                document.getElementById("headline").innerText = "It's my criket!";
                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                clearInterval(x);
            }
        }, 0);
}());
