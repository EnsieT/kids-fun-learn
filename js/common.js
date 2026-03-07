/**
 * common.js — Shared utilities for Kids Fun Learn
 * Confetti, feedback, grading, localStorage helpers, speech, language selector
 */

/* ===== Language Configuration ===== */
const LANGUAGES = {
  en: { code: 'en-IN', label: 'English',  flag: '🇬🇧' },
  hi: { code: 'hi-IN', label: 'हिन्दी',    flag: '🇮🇳' },
  gu: { code: 'gu-IN', label: 'ગુજરાતી',  flag: '🇮🇳' }
};
const LANG_KEY = 'kidsFunLearn_language';

function getCurrentLanguage() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function setLanguage(langKey) {
  if (!LANGUAGES[langKey]) return;
  localStorage.setItem(LANG_KEY, langKey);
  updateLanguageSelectorUI();
  if (typeof onLanguageChange === 'function') onLanguageChange(langKey);
}

/** Return the text for the current language from a textMap {en, hi, gu} */
function t(textMap) {
  if (typeof textMap === 'string') return textMap;
  const lang = getCurrentLanguage();
  return textMap[lang] || textMap['en'] || '';
}

/* ===== Speech (Web Speech API) ===== */
/**
 * speak(textOrMap, lang)
 *   textOrMap: string  → speak as-is with given lang (or hi-IN default)
 *   textOrMap: {en,hi,gu} → speak in current language
 */
function speak(textOrMap, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  let text, langCode;
  if (textOrMap && typeof textOrMap === 'object') {
    const cur = getCurrentLanguage();
    text = textOrMap[cur] || textOrMap['en'] || '';
    langCode = LANGUAGES[cur].code;
  } else {
    text = textOrMap || '';
    langCode = lang || 'hi-IN';
  }
  if (!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang  = langCode;
  utter.rate  = 0.85;
  utter.pitch = 1.1;
  setTimeout(() => window.speechSynthesis.speak(utter), 150);
}
function speakHindi(text)   { speak(text, 'hi-IN'); }
function speakEnglish(text) { speak(text, 'en-IN'); }

/* ===== Language Selector UI ===== */
function injectLanguageSelector() {
  if (document.getElementById('lang-selector')) return;
  const bar = document.createElement('div');
  bar.id = 'lang-selector';
  bar.className = 'lang-selector';
  const cur = getCurrentLanguage();
  bar.innerHTML = Object.entries(LANGUAGES).map(([key, lang]) =>
    `<button class="lang-btn${cur === key ? ' active' : ''}" data-lang="${key}"
             onclick="setLanguage('${key}')" aria-label="Switch to ${lang.label}">
       ${lang.flag} ${lang.label}
     </button>`
  ).join('');
  const header = document.querySelector('.activity-header') || document.querySelector('.site-header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(bar, header.nextSibling);
  } else {
    document.body.insertBefore(bar, document.body.firstChild);
  }
}

function updateLanguageSelectorUI() {
  const cur = getCurrentLanguage();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === cur);
  });
}

/* ===== Confetti ===== */
const CONFETTI_COLORS = ['#FFD700','#FF8C00','#FF69B4','#4CAF50','#2196F3','#9C27B0','#F44336'];

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({length: 90}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: 6 + Math.random() * 8,
    d: Math.random() * 90,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    tilt: Math.random() * 10 - 10,
    tiltAngleIncrementor: 0.07 + Math.random() * 0.05,
    tiltAngle: 0,
    vx: (Math.random() - 0.5) * 2,
    vy: 2 + Math.random() * 4,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.lineWidth = p.r / 2;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      ctx.stroke();
      // rectangles
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r * 0.6);
    });
    pieces.forEach(p => {
      p.tiltAngle += p.tiltAngleIncrementor;
      p.y += p.vy;
      p.x += p.vx;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

/* ===== Feedback ===== */
function showFeedback(correct) {
  const banner = document.getElementById('feedback-banner');
  if (!banner) return;
  banner.classList.remove('show', 'correct-fb', 'wrong-fb');
  void banner.offsetWidth; // reflow
  if (correct) {
    banner.textContent = '🎉 ' + t({en: 'Well done!', hi: 'शाबाश!', gu: 'શાબાશ!'});
    banner.classList.add('show', 'correct-fb');
    launchConfetti();
    speak({en: 'Well done!', hi: 'शाबाश!', gu: 'શાબાશ!'});
  } else {
    banner.textContent = '❌ ' + t({en: 'Try again!', hi: 'फिर से कोशिश करो!', gu: 'ફરી પ્રયત્ન કરો!'});
    banner.classList.add('show', 'wrong-fb');
    speak({en: 'Try again!', hi: 'फिर से कोशिश करो!', gu: 'ફરી પ્રયત્ન કરો!'});
  }
}

function hideFeedback() {
  const banner = document.getElementById('feedback-banner');
  if (banner) banner.classList.remove('show');
}

/* ===== Grading ===== */
/**
 * Calculate stars: 
 *   mistakes = 0     → 3 stars
 *   mistakes 1-3     → 2 stars
 *   mistakes 4+      → 1 star
 */
function calcStars(mistakes) {
  if (mistakes === 0) return 3;
  if (mistakes <= 3)  return 2;
  return 1;
}

function starsHTML(n) {
  return '⭐'.repeat(n) + '☆'.repeat(3 - n);
}

/* ===== LocalStorage helpers ===== */
function getBestScore(activity) {
  const data = JSON.parse(localStorage.getItem('kfl_scores') || '{}');
  return data[activity] || 0;
}

function saveBestScore(activity, stars) {
  const data = JSON.parse(localStorage.getItem('kfl_scores') || '{}');
  if ((data[activity] || 0) < stars) {
    data[activity] = stars;
    localStorage.setItem('kfl_scores', JSON.stringify(data));
  }
}

/* ===== Progress bar ===== */
function updateProgress(current, total) {
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = ((current / total) * 100) + '%';
  const scoreEl = document.getElementById('score-display');
  if (scoreEl) scoreEl.textContent = current + '/' + total;
}

/* ===== Completion screen ===== */
function showCompletion(activity, mistakes, total) {
  const stars = calcStars(mistakes);
  saveBestScore(activity, stars);
  const best = getBestScore(activity);

  const screen = document.getElementById('completion-screen');
  const game   = document.getElementById('game-area');
  if (game)   game.classList.add('hidden');
  if (screen) screen.classList.add('show');

  const starsEl = document.getElementById('completion-stars');
  const titleEl = document.getElementById('completion-title');
  const scoreEl = document.getElementById('completion-score');
  const bestEl  = document.getElementById('completion-best');

  if (starsEl) starsEl.textContent = starsHTML(stars);
  if (titleEl) {
    if (stars === 3) {
      titleEl.textContent = '🎊 ' + t({en: 'Excellent!', hi: 'शानदार!', gu: 'ખૂબ સરસ!'});
      speak({en: 'Excellent! You earned 3 stars!', hi: 'बहुत अच्छा! तुमने तीन सितारे कमाए!', gu: 'ખૂબ સરસ! તમે 3 સ્ટાર મેળવ્યા!'});
    } else if (stars === 2) {
      titleEl.textContent = '👏 ' + t({en: 'Very Good!', hi: 'बहुत अच्छा!', gu: 'ખૂબ સારું!'});
      speak({en: 'Very good! You earned 2 stars!', hi: 'बहुत अच्छा! तुमने दो सितारे कमाए!', gu: 'ખૂબ સારું! તમે 2 સ્ટાર મેળવ્યા!'});
    } else {
      titleEl.textContent = '💪 ' + t({en: 'Good Try!', hi: 'अच्छा प्रयास!', gu: 'સારો પ્રયત્ન!'});
      speak({en: 'Good try! You earned 1 star!', hi: 'अच्छा प्रयास! एक सितारा!', gu: 'સારો પ્રયત્ન! 1 સ્ટાર!'});
    }
  }
  if (scoreEl) scoreEl.textContent = `Score: ${total - mistakes} / ${total}`;
  if (bestEl)  bestEl.textContent  = `Best: ${starsHTML(best)}`;

  launchConfetti();
}

/* ===== Navigation ===== */
function goHome() {
  window.location.href = '../index.html';
}

/* ===== Shuffle array ===== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ===== Pick N random items from array ===== */
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

/* ===== Update homepage card stars ===== */
function loadHomeStars() {
  const data = JSON.parse(localStorage.getItem('kfl_scores') || '{}');
  Object.entries(data).forEach(([key, stars]) => {
    const el = document.getElementById('stars-' + key);
    if (el) el.textContent = starsHTML(stars);
  });
}
