/* shape-matching.js — Shape Matching Logic */

(function () {
  const SHAPES = [
    {
      id: 'circle', name: 'Circle', nameHi: 'गोला',
      color: '#FF6B35',
      svg: `<svg viewBox="0 0 56 56"><circle cx="28" cy="28" r="22" fill="#FF6B35"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><circle cx="28" cy="28" r="22"/></svg>`,
    },
    {
      id: 'triangle', name: 'Triangle', nameHi: 'त्रिभुज',
      color: '#4ECDC4',
      svg: `<svg viewBox="0 0 56 56"><polygon points="28,6 52,50 4,50" fill="#4ECDC4"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><polygon points="28,6 52,50 4,50"/></svg>`,
    },
    {
      id: 'square', name: 'Square', nameHi: 'वर्ग',
      color: '#FFE66D',
      svg: `<svg viewBox="0 0 56 56"><rect x="7" y="7" width="42" height="42" rx="4" fill="#FFE66D"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><rect x="7" y="7" width="42" height="42" rx="4"/></svg>`,
    },
    {
      id: 'rectangle', name: 'Rectangle', nameHi: 'आयत',
      color: '#A8E6CF',
      svg: `<svg viewBox="0 0 56 56"><rect x="4" y="14" width="48" height="28" rx="4" fill="#A8E6CF"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><rect x="4" y="14" width="48" height="28" rx="4"/></svg>`,
    },
    {
      id: 'star', name: 'Star', nameHi: 'तारा',
      color: '#FF8B94',
      svg: `<svg viewBox="0 0 56 56"><polygon points="28,4 34,20 52,20 38,30 44,48 28,38 12,48 18,30 4,20 22,20" fill="#FF8B94"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><polygon points="28,4 34,20 52,20 38,30 44,48 28,38 12,48 18,30 4,20 22,20"/></svg>`,
    },
    {
      id: 'diamond', name: 'Diamond', nameHi: 'हीरा',
      color: '#A29BFE',
      svg: `<svg viewBox="0 0 56 56"><polygon points="28,4 52,28 28,52 4,28" fill="#A29BFE"/></svg>`,
      outline: `<svg viewBox="0 0 56 56"><polygon points="28,4 52,28 28,52 4,28"/></svg>`,
    },
  ];

  let selectedColored = null;
  let matched = 0;
  let attempts = 0;
  let shuffledOutlines = [];

  const el = {
    matchedCount:  document.getElementById('matched-count'),
    totalShapes:   document.getElementById('total-shapes'),
    progress:      document.getElementById('progress-bar'),
    coloredRow:    document.getElementById('colored-shapes'),
    outlineRow:    document.getElementById('outline-shapes'),
    gameCard:      document.getElementById('game-card'),
    completeScreen:document.getElementById('complete-screen'),
    finalStars:    document.getElementById('final-stars'),
    replayBtn:     document.getElementById('replay-btn'),
  };

  el.totalShapes.textContent = SHAPES.length;
  el.replayBtn.addEventListener('click', init);

  function init() {
    matched = 0; attempts = 0; selectedColored = null;
    el.completeScreen.classList.add('hidden');
    el.gameCard.classList.remove('hidden');
    el.matchedCount.textContent = 0;
    el.progress.style.width = '0%';

    shuffledOutlines = shuffle([...SHAPES]);
    renderShapes();
  }

  function renderShapes() {
    el.coloredRow.innerHTML = '';
    el.outlineRow.innerHTML = '';

    SHAPES.forEach(shape => {
      const card = document.createElement('div');
      card.className = 'shape-card';
      card.dataset.id = shape.id;
      card.innerHTML = shape.svg + `<div class="shape-label">${shape.name}<br/>${shape.nameHi}</div>`;
      card.addEventListener('click', () => onColoredClick(card, shape));
      el.coloredRow.appendChild(card);
    });

    shuffledOutlines.forEach(shape => {
      const card = document.createElement('div');
      card.className = 'shape-card outline-shape';
      card.dataset.id = shape.id;
      card.innerHTML = shape.outline;
      card.addEventListener('click', () => onOutlineClick(card, shape));
      el.outlineRow.appendChild(card);
    });
  }

  function onColoredClick(card, shape) {
    if (card.classList.contains('matched')) return;

    // deselect previous
    el.coloredRow.querySelectorAll('.shape-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedColored = shape;
  }

  function onOutlineClick(card, shape) {
    if (!selectedColored) {
      // pulse the colored area to indicate selection needed
      el.coloredRow.style.outline = '3px solid var(--primary)';
      setTimeout(() => el.coloredRow.style.outline = '', 600);
      return;
    }
    if (card.classList.contains('matched')) return;

    attempts++;

    if (shape.id === selectedColored.id) {
      // correct match
      card.classList.add('matched');
      // find the colored card and mark it
      const coloredCard = el.coloredRow.querySelector(`[data-id="${shape.id}"]`);
      if (coloredCard) coloredCard.classList.add('matched');

      matched++;
      el.matchedCount.textContent = matched;
      el.progress.style.width = (matched / SHAPES.length * 100) + '%';

      Sound.correct();
      selectedColored = null;

      if (matched === SHAPES.length) {
        setTimeout(showComplete, 500);
      }
    } else {
      // wrong match
      card.classList.add('wrong');
      shakeElement(card);
      Sound.wrong();
      setTimeout(() => card.classList.remove('wrong'), 600);
    }
  }

  function showComplete() {
    el.gameCard.classList.add('hidden');
    el.completeScreen.classList.remove('hidden');
    // stars based on efficiency (fewer wrong attempts = more stars)
    const extra = attempts - SHAPES.length;
    const stars = extra <= 1 ? 3 : extra <= 3 ? 2 : 1;
    Progress.setStars('shape-matching', stars);
    el.finalStars.textContent = starsHTML(stars);
    Feedback.showComplete({ stars, onReplay: init });
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  init();
})();
