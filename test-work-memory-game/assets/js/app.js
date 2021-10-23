const boards = document.querySelectorAll('.board');
const gameBoard = document.querySelector('#game');
const btn = document.querySelector('.btn');
const input = document.querySelector('.board__input');

const movesHtml = document.querySelector('#moves');
const timeHtml = document.querySelector('#time');

// cards array
const cards = [
  { name: 'star', img: '<i class="fas fa-star"></i>' },
  { name: 'star', img: '<i class="fas fa-star"></i>' },
  { name: 'sun', img: '<i class="fas fa-sun"></i>' },
  { name: 'sun', img: '<i class="fas fa-sun"></i>' },
  { name: 'chess', img: '<i class="fas fa-chess"></i>' },
  { name: 'chess', img: '<i class="fas fa-chess"></i>' },
  { name: 'dice', img: '<i class="fas fa-dice"></i>' },
  { name: 'dice', img: '<i class="fas fa-dice"></i>' },
  { name: 'stroopwafel', img: '<i class="fas fa-stroopwafel"></i>' },
  { name: 'stroopwafel', img: '<i class="fas fa-stroopwafel"></i>' },
  { name: 'dice-d20', img: '<i class="fas fa-dice-d20"></i>' },
  { name: 'dice-d20', img: '<i class="fas fa-dice-d20"></i>' },
  { name: 'cloud', img: '<i class="fas fa-cloud"></i>' },
  { name: 'cloud', img: '<i class="fas fa-cloud"></i>' },
  { name: 'umbrella', img: '<i class="fas fa-umbrella"></i>' },
  { name: 'umbrella', img: '<i class="fas fa-umbrella"></i>' },
  { name: 'anchor', img: '<i class="fas fa-anchor"></i>' },
  { name: 'anchor', img: '<i class="fas fa-anchor"></i>' },
  { name: 'phoenix', img: '<i class="fab fa-phoenix-squadron"></i>' },
  { name: 'phoenix', img: '<i class="fab fa-phoenix-squadron"></i>' },
  { name: 'square', img: '<i class="fas fa-square-full"></i>' },
  { name: 'square', img: '<i class="fas fa-square-full"></i>' },
  { name: 'jedi', img: '<i class="fas fa-jedi"></i>' },
  { name: 'jedi', img: '<i class="fas fa-jedi"></i>' },
];

// Variables for game
let chosenCard = [];
let chosenCardId = [];
let wonCard = [];

// Variable for game info
let moves = 0;

// Variables for game time
let time;
let minutes = 0;
let seconds = 0;

// Start game
btn.addEventListener('click', () => {
  boards[0].classList.add('up');

  // generate delay
  generateDelayTime();
  // generate card
  generateCard();
  // start time
  startTime();
});

// Functions:
// generate card function
function generateCard() {
  shuffleCards();
  for (let i = 0; i < cards.length; i++) {
    const current = cards[i];

    const card = document.createElement('div');
    card.classList.add('game__item');
    card.setAttribute('data-id', i);
    card.innerHTML = `
    <div class="game__card">
      <div class="game__card--side game__card--back">
      ${current.img}
      </div>
      <div class="game__card--side game__card--front">
        <img src="./assets/images/card-front/square.png" />
        <img src="./assets/images/card-front/triangle.png" />
        <img src="./assets/images/card-front/circle.png" />
      </div>
    </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.append(card);
  }
}

// shuffle card function
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// flip card function
function flipCard() {
  const cardId = this.dataset.id;
  const gameCard = this.querySelector('.game__card');

  chosenCard.push(cards[cardId].name);
  chosenCardId.push(cardId);

  if (gameCard.style.transform != 'rotateY(180deg)') {
    gameCard.style.transform = 'rotateY(180deg)';
  }

  if (chosenCard.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const gameCard = document.querySelectorAll('.game__card');

  const first = chosenCardId[0];
  const second = chosenCardId[1];

  if (chosenCard[0] === chosenCard[1]) {
    great();

    gameCard[first].querySelector('.game__card--side').style.background =
      'plum';
    gameCard[second].querySelector('.game__card--side').style.background =
      'plum';

    gameCard[first].parentElement.removeEventListener('click', flipCard);
    gameCard[second].parentElement.removeEventListener('click', flipCard);

    wonCard.push(chosenCard);
  } else {
    worse();
    gameCard[first].style.transform = 'rotateY(0deg)';
    gameCard[second].style.transform = 'rotateY(0deg)';
  }

  chosenCard = [];
  chosenCardId = [];

  moves++;
  movesHtml.innerHTML = moves;

  if (wonCard.length === cards.length / 2) {
    setTimeout(() => {
      modal.style.display = 'block';
      document.querySelector('.modal__content').style.animation =
        'animateStart 0.5s';
    }, 500);

    modalInfo.innerHTML = `<span class="board__player">Player ${input.value}</span> won this game
    <div>Your moves: ${moves}</div>
    <div>Your time: ${timeHtml.innerHTML}</div>
    `;

    stopTime();
  }
}

// generate delay function
function generateDelayTime() {
  setTimeout(() => {
    const gameCard = document.querySelectorAll('.game__card');
    gameCard.forEach((item) => {
      item.style.animation = 'rotateCard 2s';
    });
  }, 500);
}

// start time
function startTime() {
  time = setInterval(function () {
    seconds++;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (seconds === 60) {
      minutes++;
      seconds = `0${0}`;
    }

    if (minutes >= 10) {
      timeHtml.innerHTML = `${minutes}:${seconds}`;
    } else {
      timeHtml.innerHTML = `0${minutes}:${seconds}`;
    }
  }, 1000);
}

// stop time
function stopTime() {
  clearInterval(time);
}

function great() {
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Great, you found a match</span>';
  notif.classList.add('notification');

  document.querySelector('.board--second').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}

function worse() {
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Worse, try again</span>';
  notif.classList.add('notification');
  notif.style.color = '#e53935';

  document.querySelector('.board--second').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}
