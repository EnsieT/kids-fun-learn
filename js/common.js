/* =========================================================
   common.js — Shared utilities for Kids Fun Learn
   - Confetti animation
   - Feedback (correct / wrong)
   - Progress saving (localStorage)
   - Sound effects (Web Audio API)
   ========================================================= */

/* ---- Confetti ---- */
const Confetti = (() => {
  let canvas, ctx, particles = [], animId;

  function init() {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (canvas) {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  const COLORS = ['#FF6B35','#FFE66D','#4ECDC4','#A8E6CF','#FF8B94','#A29BFE','#FDCB6E','#74B9FF'];

  function createParticle() {
    return {
      x:  Math.random() * canvas.width,
      y: -10,
      w:  Math.random() * 12 + 6,
      h:  Math.random() * 6  + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      vr: (Math.random() - 0.5) * 0.2,
      life: 1,
    };
  }

  function launch(count = 80) {
    init();
    cancelAnimationFrame(animId);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(createParticle());
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.12; // gravity
      p.rotation += p.vr;
      p.life -= 0.01;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 20);
    if (particles.length > 0) {
      animId = requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return { launch };
})();

/* ---- Sound (Web Audio API) ---- */
const Sound = (() => {
  let ac;

  function getAC() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    return ac;
  }

  function beep(freq, type, duration, gainVal) {
    try {
      const a = getAC();
      const osc  = a.createOscillator();
      const gain = a.createGain();
      osc.connect(gain);
      gain.connect(a.destination);
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainVal || 0.3, a.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + duration);
      osc.start(a.currentTime);
      osc.stop(a.currentTime + duration);
    } catch (e) { /* ignore */ }
  }

  function correct() {
    beep(523, 'sine', 0.15, 0.3);
    setTimeout(() => beep(659, 'sine', 0.15, 0.3), 100);
    setTimeout(() => beep(784, 'sine', 0.25, 0.3), 200);
  }

  function wrong() {
    beep(220, 'square', 0.2, 0.2);
    setTimeout(() => beep(180, 'square', 0.3, 0.15), 150);
  }

  function complete() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 'sine', 0.2, 0.3), i * 100));
  }

  return { correct, wrong, complete };
})();

/* ---- Feedback ---- */
const Feedback = (() => {
  let overlay, box, emojiEl, titleEl, subtitleEl, btnEl;

  const CORRECT_MSGS = [
    { en: 'Great job!',    hi: 'बहुत बढ़िया!' },
    { en: 'Well done!',    hi: 'शाबाश!' },
    { en: 'Awesome!',      hi: 'सही जवाब!' },
    { en: 'Excellent!',    hi: 'बहुत अच्छे!' },
    { en: 'You got it!',   hi: 'वाह!' },
  ];

  const WRONG_MSGS = [
    { en: 'Try again!',         hi: 'फिर से कोशिश करो!' },
    { en: "Don't give up!",     hi: 'हिम्मत रखो!' },
    { en: 'Almost there!',      hi: 'लगभग सही!' },
  ];

  function getOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'feedback-overlay';
      overlay.innerHTML = `
        <div class="feedback-box" id="feedback-box">
          <div class="feedback-emoji" id="feedback-emoji"></div>
          <div class="feedback-title" id="feedback-title"></div>
          <div class="feedback-subtitle" id="feedback-subtitle"></div>
          <button class="btn btn-primary" id="feedback-btn" style="margin-top:8px">Next ➡️</button>
        </div>`;
      document.body.appendChild(overlay);
      emojiEl    = document.getElementById('feedback-emoji');
      titleEl    = document.getElementById('feedback-title');
      subtitleEl = document.getElementById('feedback-subtitle');
      btnEl      = document.getElementById('feedback-btn');
      overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });
    }
    return overlay;
  }

  function show({ emoji, title, subtitle, btnText = 'Next ➡️', onNext }) {
    const ov = getOverlay();
    emojiEl.textContent    = emoji;
    titleEl.textContent    = title;
    subtitleEl.textContent = subtitle || '';
    btnEl.textContent      = btnText;
    btnEl.onclick = () => { hide(); if (onNext) onNext(); };
    ov.classList.add('show');
  }

  function hide() {
    if (overlay) overlay.classList.remove('show');
  }

  function showCorrect(onNext) {
    const msg = CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)];
    Confetti.launch(100);
    Sound.correct();
    show({
      emoji: '🎉',
      title: msg.en,
      subtitle: msg.hi,
      btnText: 'Next ➡️',
      onNext,
    });
  }

  function showWrong(onNext) {
    const msg = WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)];
    Sound.wrong();
    show({
      emoji: '😅',
      title: msg.en,
      subtitle: msg.hi,
      btnText: 'Try Again 🔄',
      onNext,
    });
  }

  function showComplete({ stars, onReplay }) {
    Confetti.launch(150);
    Sound.complete();
    const starStr = '⭐'.repeat(stars) + (stars < 3 ? '☆'.repeat(3 - stars) : '');
    show({
      emoji: stars === 3 ? '🏆' : stars === 2 ? '🌟' : '👍',
      title: stars === 3 ? 'Perfect!' : stars === 2 ? 'Well done!' : 'Good try!',
      subtitle: `${starStr}\n${stars === 3 ? 'शाबाश! 3/3 ⭐' : stars === 2 ? 'बहुत अच्छे! 2/3 ⭐' : 'कोशिश जारी रखो! 1/3 ⭐'}`,
      btnText: '🔄 Play Again',
      onNext: onReplay,
    });
  }

  return { show, hide, showCorrect, showWrong, showComplete };
})();

/* ---- Progress (localStorage) ---- */
const Progress = (() => {
  const KEY = 'kfl_progress';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
  }

  function getStars(activity) {
    return load()[activity] || 0;
  }

  function setStars(activity, stars) {
    const data = load();
    data[activity] = Math.max(data[activity] || 0, stars);
    save(data);
  }

  function calcStars(correct, total) {
    const pct = correct / total;
    if (pct >= 0.9) return 3;
    if (pct >= 0.6) return 2;
    return 1;
  }

  return { getStars, setStars, calcStars };
})();

/* ---- Shake animation helper ---- */
function shakeElement(el) {
  el.classList.remove('shake');
  void el.offsetWidth; // Force reflow to restart CSS animation
  el.classList.add('shake');
  el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
}

/* ---- Stars display ---- */
function starsHTML(n) {
  return '⭐'.repeat(n) + (n < 3 ? '☆'.repeat(3 - n) : '');
}
