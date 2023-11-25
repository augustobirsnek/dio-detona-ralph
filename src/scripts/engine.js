const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        gameOver: document.querySelector("#game-over"),
        scoreTotal: document.querySelector("#score-total"),
        reiniciar: document.querySelector("#reiniciar").addEventListener("click", () => location.href = "./index.html")
    },
    values: {
        gameVelocity: 750,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLife: 5
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        gameOver();
    }
}

function loseLife() {
    state.values.currentLife--;
    state.view.life.textContent = state.values.currentLife;
    if(state.values.currentLife <= 0) {
        playSound("game-over.mp3","0.2");
        gameOver();
    }       
}

function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.scoreTotal.textContent = state.values.result;
    state.values.hitPosition = null;
    state.view.gameOver.style.display = 'flex';
    init()
}

function playSound(audioName,volume) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = volume;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a",0.2);
            } else if(square.id !== state.values.hitPosition && state.values.hitPosition !== null) {
                playSound("lose-life.mp3",0.3);
                loseLife();
                state.values.hitPosition = null;
            }
        })
    })
}

function init() {
    addListenerHitBox();
}

init();