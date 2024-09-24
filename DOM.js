"use strict";

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, playeActive, currentscore, playing;

const init = function () {
  score = [0, 0];
  playeActive = 0;
  currentscore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${playeActive}`).textContent = 0;
  currentscore = 0;
  playeActive = playeActive === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentscore += randomDice;
      document.getElementById(`current--${playeActive}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[playeActive] += currentscore;
    document.getElementById(`score--${playeActive}`).textContent =
      score[playeActive];

    if (score[playeActive] >= 10) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${playeActive}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${playeActive}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
