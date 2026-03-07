/* pattern.js — Pattern Completion Logic */

(function () {
  // Pattern templates: sequence is shown minus last element, answer is last
  const PATTERNS = [
    // ABAB patterns
    { seq: ['🥭','🍌','🥭','🍌','🥭'], answer: '🍌', distractors: ['🥥','🍊','🍇'] },
    { seq: ['🐘','🐯','🐘','🐯','🐘'], answer: '🐯', distractors: ['🦁','🐄','🦜'] },
    { seq: ['🔴','🔵','🔴','🔵','🔴'], answer: '🔵', distractors: ['🟡','🟢','🟠'] },
    { seq: ['⭐','🌙','⭐','🌙','⭐'], answer: '🌙', distractors: ['☀️','🌈','⛅'] },
    // AABB patterns
    { seq: ['🥭','🥭','🍌','🍌','🥭'], answer: '🥭', distractors: ['🍌','🥥','🍇'] },
    { seq: ['🐘','🐘','🐯','🐯','🐘'], answer: '🐘', distractors: ['🐯','🦁','🐄'] },
    // ABC patterns
    { seq: ['🍎','🍌','🥥','🍎','🍌'], answer: '🥥', distractors: ['🍇','🥭','🍋'] },
    { seq: ['🔴','🟡','🔵','🔴','🟡'], answer: '🔵', distractors: ['🟢','🟠','🟣'] },
    // Number patterns (emoji numbers)
    { seq: ['1️⃣','2️⃣','3️⃣','4️⃣'], answer: '5️⃣', distractors: ['6️⃣','7️⃣','8️⃣'] },
    { seq: ['2️⃣','4️⃣','6️⃣','8️⃣'], answer: '🔟', distractors: ['9️⃣','7️⃣','5️⃣'] },
    // Animal patterns
    { seq: ['🦚','🐄','🦚','🐄','🦚'], answer: '🐄', distractors: ['🐘','🦁','🐒'] },
    { seq: ['🌸','🌿','🌸','🌿','🌸'], answer: '🌿', distractors: ['🌺','🌻','🍀'] },
  ];

  const TOTAL_ROUNDS = 8;
  let round = 0, score = 0, correctCount = 0;
  let currentAnswer = null;
  let answered = false;
  let usedPatterns = [];

  const el = {
    roundNum:    document.getElementById('round-num'),
    totalRounds: document.getElementById('total-rounds'),
    score:       document.getElementById('score'),
    progress:    document.getElementById('progress-bar'),
    patternSeq:  document.getElementById('pattern-sequence'),
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
    round = 0; score = 0; correctCount = 0; usedPatterns = [];
    el.completeScreen.classList.add('hidden');
    el.gameCard.classList.remove('hidden');
    nextRound();
  }

  function nextRound() {
    if (round >= TOTAL_ROUNDS) { showComplete(); return; }
    round++;
    answered = false;
    el.roundNum.textContent = round;
    el.progress.style.width = ((round - 1) / TOTAL_ROUNDS * 100) + '%';

    let available = PATTERNS.filter((_, i) => !usedPatterns.includes(i));
    if (available.length === 0) { usedPatterns = []; available = PATTERNS; }
    const idx = Math.floor(Math.random() * available.length);
    const patternData = available[idx];
    usedPatterns.push(PATTERNS.indexOf(patternData));

    currentAnswer = patternData.answer;

    // Render sequence (hide last with blank)
    el.patternSeq.innerHTML = '';
    patternData.seq.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'pattern-item';
      div.textContent = item;
      el.patternSeq.appendChild(div);
      if (i < patternData.seq.length - 1) {
        // arrow
        const arrow = document.createElement('span');
        arrow.className = 'pattern-arrow';
        arrow.textContent = '→';
        el.patternSeq.appendChild(arrow);
      }
    });
    // blank
    const arrow2 = document.createElement('span');
    arrow2.className = 'pattern-arrow';
    arrow2.textContent = '→';
    el.patternSeq.appendChild(arrow2);
    const blank = document.createElement('div');
    blank.className = 'pattern-item blank';
    blank.textContent = '❓';
    el.patternSeq.appendChild(blank);

    // Options
    const opts = shuffle([currentAnswer, ...patternData.distractors.slice(0, 3)]);
    el.options.innerHTML = '';
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.style.fontSize = '2rem';
      btn.addEventListener('click', () => onAnswer(btn, opt, blank));
      el.options.appendChild(btn);
    });
  }

  function onAnswer(btn, value, blank) {
    if (answered) return;
    answered = true;

    if (value === currentAnswer) {
      btn.classList.add('correct');
      blank.textContent = currentAnswer;
      blank.style.background = '#DFFFF4';
      blank.style.borderStyle = 'solid';
      score += 10;
      correctCount++;
      el.score.textContent = score;
      Feedback.showCorrect(() => nextRound());
    } else {
      btn.classList.add('wrong');
      shakeElement(btn);
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
    Progress.setStars('pattern', stars);
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
