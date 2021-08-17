let colors = ['red', 'blue', 'green', 'yellow', 'violet'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let score = document.querySelectorAll('.score');
let count = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let yesBtn = document.querySelector('.restart');
let noBtn = document.querySelector('.end');
let startBtn = document.querySelector('.start-game-btn');
let bgMusic = document.querySelector('.bg-music');
let startWindow = document.querySelector('.start-game-window');


const createBalloon = () => {
    let div = document.createElement('div');

    let lol = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[lol];

    lol = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = lol + 'px';

    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);

    animateBalloon(div);
}

const animateBalloon = (element) => {
    let pos = 0;
    let haha = Math.floor(Math.random() * 6 - 3); 
    let interval = setInterval(movement, 12 - Math.floor(count / 10) + haha );

    function movement() {
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+element.dataset.number+'"]') !== null)) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            element.style.top = windowHeight - pos + 'px';
        }
    }
}

const deleteBalloon = (element) => {
    element.remove();
    count++;
    updateScore();
    popUpSound();
}

const popUpSound = () => {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

const updateScore = () => {
    for (let i=0; i < score.length; i++) {
        score[i].textContent = count;
    }
}

const startGame = () => {
    restartGame();
    let timeout = 0;

    let loop = setInterval(() => {
        timeout = Math.floor(Math.random() * 600 - 100);
        if (!gameOver && count !== total) {
            createBalloon();
        } else if (count !== total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block'; 
        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block'; 
        }
    }, 800 + timeout);
}

const restartGame = () => {
    let removingBalloons = document.querySelectorAll('.balloon');
    for (let i=0; i < removingBalloons.length; i++) {
        removingBalloons[i].remove();
    }
    gameOver = false;
    count = 0;
    updateScore();
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('balloon')) {
        deleteBalloon(e.target);
    }
})

yesBtn.addEventListener('click', () => {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})

noBtn.addEventListener('click', () => {
    totalShadow.style.display = 'none';
})

startBtn.addEventListener('click', () => {
    startGame();
    bgMusic.play();
    startWindow.style.display = 'none';
})







