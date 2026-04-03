const resultsEl = document.getElementById('results');
const generateBtn = document.getElementById('generateBtn');
const themeBtn = document.getElementById('themeBtn');

// Theme Logic
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
}

function updateThemeButton(theme) {
  themeBtn.textContent = theme === 'light' ? '🌙 다크 모드' : '☀️ 화이트 모드';
}

themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

// Lotto Logic
function getBallClass(number) {
  if (number <= 10) return 'range-1-10';
  if (number <= 20) return 'range-11-20';
  if (number <= 30) return 'range-21-30';
  if (number <= 40) return 'range-31-40';
  return 'range-41-45';
}

function generateOneSet() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return [...numbers].sort((a, b) => a - b);
}

function renderSets() {
  resultsEl.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const setNumbers = generateOneSet();
    const setEl = document.createElement('div');
    setEl.className = 'set';

    const titleEl = document.createElement('div');
    titleEl.className = 'set-title';
    titleEl.textContent = `${i}번 추천`;

    const ballsEl = document.createElement('div');
    ballsEl.className = 'balls';

    setNumbers.forEach((number) => {
      const ballEl = document.createElement('div');
      ballEl.className = `ball ${getBallClass(number)}`;
      ballEl.textContent = number;
      ballsEl.appendChild(ballEl);
    });

    setEl.appendChild(titleEl);
    setEl.appendChild(ballsEl);
    resultsEl.appendChild(setEl);
  }
}

generateBtn.addEventListener('click', renderSets);

// Initialize
initTheme();
renderSets();
