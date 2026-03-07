/* math.js — Simple Math Logic (Addition & Subtraction) */

(function () {
  const EMOJI_OBJECTS = [
    '🥭','🍌','🥥','🍋','⭐','🌸','🪔','🍎','🍊','🎈',
    '🦋','🐘','🦚','🎀','💎',
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
    questionType:document.getElementById('question-type'),
    equationArea:document.getElementById('equation-area'),
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
    nextRound();
  }

  function maxForRound(r) {
    if (r <= 2) return 5;
    if (r <= 5) return 8;
    return 10;
  }

  function nextRound() {
    if (round >= TOTAL_ROUNDS) { showComplete(); return; }
    round++;
    answered = false;
    el.roundNum.textContent = round;
    el.progress.style.width = ((round - 1) / TOTAL_ROUNDS * 100) + '%';

    const max = maxForRound(round);
    const useSubtraction = round > 3 && Math.random() < 0.5;
    const emoji = EMOJI_OBJECTS[Math.floor(Math.random() * EMOJI_OBJECTS.length)];

    let a, b;
    if (useSubtraction) {
      a = Math.floor(Math.random() * (max - 1)) + 2;
      b = Math.floor(Math.random() * (a - 1)) + 1;
      currentAnswer = a - b;
      el.questionType.textContent = 'Subtraction / घटाना';
      renderEquation(emoji, a, b, '-', currentAnswer);
    } else {
      a = Math.floor(Math.random() * (max - 1)) + 1;
      b = Math.floor(Math.random() * (max - a)) + 1;
      if (a + b > max) b = max - a;
      if (b < 1) b = 1;
      currentAnswer = a + b;
      el.questionType.textContent = 'Addition / जोड़';
      renderEquation(emoji, a, b, '+', currentAnswer);
    }

    // Options
    const opts = generateOptions(currentAnswer, Math.min(currentAnswer + 5, max + 3));
    el.options.innerHTML = '';
    opts.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = n;
      btn.addEventListener('click', () => onAnswer(btn, n));
      el.options.appendChild(btn);
    });
  }

  function renderEquation(emoji, a, b, op, answer) {
    const groupA = emoji.repeat(a);
    const groupB = emoji.repeat(b);

    el.equationArea.innerHTML = `
      <div class="math-equation-layout">
        <div class="math-equation-row">
          <div class="math-emoji-group">${groupA}</div>
          <div class="math-operator">${op}</div>
          <div class="math-emoji-group b-group">${groupB}</div>
          <div class="math-equals">=</div>
          <div class="math-blank">❓</div>
        </div>
        <div class="math-equation-label">${a} ${op} ${b} = ?</div>
      </div>`;
  }

  function generateOptions(correct, max) {
    const set = new Set([correct]);
    while (set.size < 4) {
      const r = Math.max(0, correct + Math.floor(Math.random() * 7) - 3);
      if (r !== correct && r >= 0) set.add(r);
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
      // fill in blank
      const blank = el.equationArea.querySelector('.math-blank');
      if (blank) { blank.textContent = currentAnswer; blank.style.background = '#DFFFF4'; }
      Feedback.showCorrect(() => nextRound());
    } else {
      btn.classList.add('wrong');
      shakeElement(btn);
      [...el.options.children].forEach(b => {
        if (+b.textContent === currentAnswer) b.classList.add('correct');
      });
      Feedback.showWrong(() => {
        answered = false;
        [...el.options.children].forEach(b => b.classList.remove('correct', 'wrong'));
      });
    }
  }

  function showComplete() {
    el.progress.style.width = '100%';
    el.gameCard.classList.add('hidden');
    el.completeScreen.classList.remove('hidden');
    const stars = Progress.calcStars(correctCount, TOTAL_ROUNDS);
    Progress.setStars('math', stars);
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
