/* ===== KIDS FUN LEARN - Common JS Utilities ===== */

// ===== Progress & Score Storage =====

const STORAGE_KEY = 'kidsLearnProgress';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveActivityStars(activityId, stars) {
  const progress = getProgress();
  // Only update if new score is better
  if (!progress[activityId] || stars > progress[activityId]) {
    progress[activityId] = stars;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

function getActivityStars(activityId) {
  const progress = getProgress();
  return progress[activityId] || 0;
}

function getTotalStars() {
  const progress = getProgress();
  return Object.values(progress).reduce((sum, s) => sum + s, 0);
}

function renderStars(count, max = 3) {
  let html = '';
  for (let i = 1; i <= max; i++) {
    html += i <= count ? '⭐' : '☆';
  }
  return html;
}

// ===== Confetti =====

function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#138808', '#E91E8C', '#FDD835', '#42A5F5', '#7B1FA2']
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.5, x: 0.2 },
        colors: ['#FF9933', '#138808', '#E91E8C']
      });
    }, 300);
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.5, x: 0.8 },
        colors: ['#FDD835', '#42A5F5', '#7B1FA2']
      });
    }, 500);
  }
}

// ===== Star float animation =====

function showStarFloat(x, y) {
  const star = document.createElement('div');
  star.className = 'star-float';
  star.textContent = '+1 ⭐';
  star.style.left = (x || window.innerWidth / 2) + 'px';
  star.style.top = (y || window.innerHeight / 2) + 'px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 900);
}

// ===== Shake animation helper =====

function shakeElement(el) {
  el.classList.remove('wrong');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('wrong');
}

// ===== Feedback helpers =====

function showCorrectFeedback(el) {
  el.classList.remove('wrong');
  el.classList.add('correct');
}

function showWrongFeedback(el) {
  el.classList.remove('correct');
  shakeElement(el);
}

// ===== Score calculation =====

/**
 * Calculate stars based on wrong answers
 * @param {number} wrongCount
 * @param {number} totalRounds
 * @returns {number} 1-3 stars
 */
function calculateStars(wrongCount, totalRounds) {
  const errorRate = wrongCount / totalRounds;
  if (errorRate === 0) return 3;
  if (errorRate <= 0.3) return 2;
  return 1;
}

// ===== Shuffle array =====

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== Random integer =====

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== Pick N random items from array =====

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ===== Show end screen =====

/**
 * Shows the end/results screen inside a container element.
 * @param {HTMLElement} container - where to render
 * @param {number} stars - 1-3
 * @param {number} correct - correct answers
 * @param {number} total - total rounds
 * @param {string} activityId - for localStorage
 * @param {Function} onPlayAgain - callback
 */
function showEndScreen(container, stars, correct, total, activityId, onPlayAgain) {
  saveActivityStars(activityId, stars);
  launchConfetti();

  const msgs = [
    ['शाबाश! / Well done!', '🌟'],
    ['बहुत अच्छे! / Very Good!', '🎊'],
    ['वाह! / Wow!', '🏆']
  ];
  const [msg, emoji] = msgs[stars - 1] || msgs[0];

  container.innerHTML = `
    <div class="end-screen animate-bounce-in">
      <div class="end-emoji">${emoji}</div>
      <h2>${msg}</h2>
      <p>Score: ${correct} / ${total}</p>
      <div class="stars-display">${renderStars(stars)}</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
        <button class="btn btn-primary" id="playAgainBtn">🔁 Play Again</button>
        <a href="index.html" class="btn btn-secondary">🏠 Home</a>
      </div>
    </div>
  `;

  document.getElementById('playAgainBtn').addEventListener('click', onPlayAgain);
}

// ===== Update homepage card star display =====

function updateHomepageStars() {
  document.querySelectorAll('[data-activity]').forEach(card => {
    const id = card.getAttribute('data-activity');
    const s = getActivityStars(id);
    const el = card.querySelector('.card-stars');
    if (el) el.textContent = s > 0 ? renderStars(s) : '';
  });
  const totalEl = document.getElementById('totalStars');
  if (totalEl) totalEl.textContent = getTotalStars();
}

// ===== Init confetti CDN fallback =====
// If confetti is not loaded, provide a no-op
if (typeof confetti === 'undefined') {
  window.confetti = function() {};
}
