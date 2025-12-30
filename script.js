const MIN_FACTOR = 1;
const MAX_FACTOR = 12;
const TABLES = [3, 4, 5, 6, 7, 8, 9, 11, 12];

let deck = [];
let currentIndex = 0;
let isFlipped = false;

const tableSelect = document.getElementById('table-select');
const card = document.getElementById('card');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const cardIndexEl = document.getElementById('card-index');
const cardTotalEl = document.getElementById('card-total');
const currentTableLabelEl = document.getElementById('current-table-label');
const deckEmptyEl = document.getElementById('deck-empty');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const resetOrderBtn = document.getElementById('reset-order-btn');

function buildDeckForTable(table) {
  const cards = [];
  for (let i = MIN_FACTOR; i <= MAX_FACTOR; i++) {
    cards.push({
      question: `${table} × ${i}`,
      answer: table * i
    });
  }
  return cards;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderCard() {
  if (!deck.length) {
    questionEl.textContent = '';
    answerEl.textContent = '';
    cardIndexEl.textContent = '0';
    cardTotalEl.textContent = '0';
    deckEmptyEl.style.display = 'block';
    return;
  }

  const cardData = deck[currentIndex];
  questionEl.textContent = cardData.question;
  answerEl.textContent = `${cardData.question} = ${cardData.answer}`;
  cardIndexEl.textContent = currentIndex + 1;
  cardTotalEl.textContent = deck.length;
  deckEmptyEl.style.display = 'none';
}

function setFlipped(flipped) {
  isFlipped = flipped;
  card.classList.toggle('flipped', flipped);
}

function updateTable(table) {
  deck = buildDeckForTable(table);
  currentIndex = 0;
  currentTableLabelEl.textContent = table;
  setFlipped(false);
  renderCard();
}

function init() {
  TABLES.forEach((t) => {
    const option = document.createElement('option');
    option.value = t;
    option.textContent = `× ${t}`;
    tableSelect.appendChild(option);
  });

  tableSelect.value = TABLES[0];
  updateTable(TABLES[0]);

  card.addEventListener('click', () => setFlipped(!isFlipped));

  tableSelect.addEventListener('change', (e) => {
    updateTable(parseInt(e.target.value, 10));
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    setFlipped(false);
    renderCard();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % deck.length;
    setFlipped(false);
    renderCard();
  });

  shuffleBtn.addEventListener('click', () => {
    shuffleArray(deck);
    currentIndex = 0;
    setFlipped(false);
    renderCard();
  });

  resetOrderBtn.addEventListener('click', () => {
    updateTable(parseInt(tableSelect.value, 10));
  });
}

document.addEventListener('DOMContentLoaded', init);
