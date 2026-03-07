/* counting.js — Counting Game Logic */

(function () {
  const OBJECTS = [
    { emoji: '🥭', name: 'mangoes',   nameHi: 'आम' },
    { emoji: '🍌', name: 'bananas',   nameHi: 'केले' },
    { emoji: '🥥', name: 'coconuts',  nameHi: 'नारियल' },
    { emoji: '🍈', name: 'guavas',    nameHi: 'अमरूद' },
    { emoji: '🍊', name: 'oranges',   nameHi: 'संतरे' },
    { emoji: '🍋', name: 'lemons',    nameHi: 'नींबू' },
    { emoji: '🍎', name: 'apples',    nameHi: 'सेब' },
    { emoji: '🌸', name: 'flowers',   nameHi: 'फूल' },
    { emoji: '⭐', name: 'stars',     nameHi: 'सितारे' },
    { emoji: '🪔', name: 'diyas',     nameHi: 'दिये' },
    { emoji: '🍫', name: 'laddoos',   nameHi: 'लड्डू' },
    { emoji: '🐘', name: 'elephants', nameHi: 'हाथी' },
  ];

  const TOTAL_ROUNDS = 8;
  let round = 0, score = 0, correctCount = 0;
  let currentAnswer = 0;
  let answered = false;

  const el = {
    roundNum:    document.getElementById('round-num'),
    totalRounds: document.getElementById('total-rounds'),
    score:       document.getElementById('score'),
    progress:    document.getElementById('progress-bar'),
    roundDots:   document.getElementById('round-dots'),
    questionText:document.getElementById('question-text'),
    questionHint:document.getElementById('question-hint'),
    emojiDisplay:document.getElementById('emoji-display'),
    options:     document.getElementById('options'),
    gameCard:    document.getElementById('game-card'),
    completeScreen: document.getElementById('complete-screen'),
    finalStars:  document.getElementById('final-stars'),
    finalScore:  document.getElementById('final-score-text'),
    replayBtn:   document.getElementById('replay-btn'),
  };

  el.totalRounds.textContent = TOTAL_ROUNDS;
  el.replayBtn.addEventListener('click', init);

  function init() {
    round = 0; score = 0; correctCount = 0;
    el.completeScreen.classList.add('hidden');
    el.gameCard.classList.remove('hidden');
    buildDots();
    nextRound();
  }

  function buildDots() {
    el.roundDots.innerHTML = '';
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const d = document.createElement('div');
      d.className = 'round-dot';
      d.id = 'dot-' + i;
      el.roundDots.appendChild(d);
    }
  }

  function updateDots() {
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const d = document.getElementById('dot-' + i);
      if (!d) continue;
      d.className = 'round-dot' + (i < round - 1 ? ' done' : i === round - 1 ? ' current' : '');
    }
  }

  function maxCountForRound(r) {
    // difficulty increases with round
    if (r <= 2) return 5;
    if (r <= 4) return 8;
    if (r <= 6) return 12;
    return 15;
  }

  function nextRound() {
    if (round >= TOTAL_ROUNDS) { showComplete(); return; }
    round++;
    answered = false;
    el.roundNum.textContent = round;
    el.progress.style.width = ((round - 1) / TOTAL_ROUNDS * 100) + '%';
    updateDots();

    const obj  = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    const max  = maxCountForRound(round);
    const min  = Math.max(1, Math.floor(max / 3));
    currentAnswer = Math.floor(Math.random() * (max - min + 1)) + min;

    el.questionText.textContent = `How many ${obj.name} do you see?`;
    el.questionHint.textContent = `कितने ${obj.nameHi} हैं?`;

    // display objects
    el.emojiDisplay.textContent = (obj.emoji + '\u200B').repeat(currentAnswer).trim();

    // generate 3 wrong options
    const opts = generateOptions(currentAnswer, max);
    el.options.innerHTML = '';
    opts.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = n;
      btn.addEventListener('click', () => onAnswer(btn, n));
      el.options.appendChild(btn);
    });
  }

  function generateOptions(correct, max) {
    const set = new Set([correct]);
    while (set.size < 4) {
      const r = Math.max(1, correct + Math.floor(Math.random() * 7) - 3);
      if (r !== correct && r >= 1 && r <= max + 2) set.add(r);
    }
    return shuffle([...set]);
  }

  function onAnswer(btn, value) {
    if (answered) return;
    answered = true;

    if (value === currentAnswer) {
      btn.classList.add('correct');
      score += 10;
      correctCount++;
      el.score.textContent = score;
      Feedback.showCorrect(() => nextRound());
    } else {
      btn.classList.add('wrong');
      shakeElement(btn);
      // highlight correct
      [...el.options.children].forEach(b => {
        if (+b.textContent === currentAnswer) b.classList.add('correct');
      });
      Feedback.showWrong(() => {
        answered = false;
        [...el.options.children].forEach(b => {
          b.classList.remove('correct', 'wrong');
        });
        // allow retry on same question
      });
    }
  }

  function showComplete() {
    el.progress.style.width = '100%';
    el.gameCard.classList.add('hidden');
    el.completeScreen.classList.remove('hidden');
    const stars = Progress.calcStars(correctCount, TOTAL_ROUNDS);
    Progress.setStars('counting', stars);
    el.finalStars.textContent = starsHTML(stars);
    el.finalScore.textContent = `Score: ${score} / ${TOTAL_ROUNDS * 10}`;
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
