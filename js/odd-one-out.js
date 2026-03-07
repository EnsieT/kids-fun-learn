/* odd-one-out.js — Odd One Out Logic */

(function () {
  const ROUNDS = [
    {
      items: ['🥭','🍌','🐄','🍇'],
      odd: '🐄',
      hint: 'Three are fruits! / तीन फल हैं!',
    },
    {
      items: ['🐘','🐯','✈️','🦁'],
      odd: '✈️',
      hint: 'Three are animals! / तीन जानवर हैं!',
    },
    {
      items: ['🔴','🟡','🔵','🍎'],
      odd: '🍎',
      hint: 'Three are colors! / तीन रंग हैं!',
    },
    {
      items: ['🚗','🚌','🐒','🚲'],
      odd: '🐒',
      hint: 'Three are vehicles! / तीन वाहन हैं!',
    },
    {
      items: ['🥕','🥦','🧅','🍌'],
      odd: '🍌',
      hint: 'Three are vegetables! / तीन सब्ज़ियाँ हैं!',
    },
    {
      items: ['🌞','🌚','⭐','🥭'],
      odd: '🥭',
      hint: 'Three are in the sky! / तीन आकाश में हैं!',
    },
    {
      items: ['🎵','🎸','🥭','🥁'],
      odd: '🥭',
      hint: 'Three are musical! / तीन संगीत से हैं!',
    },
    {
      items: ['🐄','🐘','🦁','🚂'],
      odd: '🚂',
      hint: 'Three are animals! / तीन जानवर हैं!',
    },
    {
      items: ['📚','✏️','📏','🍎'],
      odd: '🍎',
      hint: 'Three are school items! / तीन स्कूल की चीज़ें हैं!',
    },
    {
      items: ['🌧️','⛈️','☀️','🌊'],
      odd: '☀️',
      hint: 'Three involve water/rain! / तीन पानी से हैं!',
    },
    {
      items: ['🏠','🏢','🌲','🏫'],
      odd: '🌲',
      hint: 'Three are buildings! / तीन इमारतें हैं!',
    },
    {
      items: ['🍕','🍔','🥭','🌮'],
      odd: '🥭',
      hint: 'Three are cooked food! / तीन पका हुआ खाना है!',
    },
  ];

  const TOTAL_ROUNDS = 8;
  let round = 0, score = 0, correctCount = 0;
  let currentOdd = null;
  let answered = false;
  let usedRounds = [];

  const el = {
    roundNum:    document.getElementById('round-num'),
    totalRounds: document.getElementById('total-rounds'),
    score:       document.getElementById('score'),
    progress:    document.getElementById('progress-bar'),
    itemsGrid:   document.getElementById('items-grid'),
    categoryHint:document.getElementById('category-hint'),
    gameCard:    document.getElementById('game-card'),
    completeScreen: document.getElementById('complete-screen'),
    finalStars:  document.getElementById('final-stars'),
    finalScore:  document.getElementById('final-score-text'),
    replayBtn:   document.getElementById('replay-btn'),
  };

  el.totalRounds.textContent = TOTAL_ROUNDS;
  el.replayBtn.addEventListener('click', init);

  function init() {
    round = 0; score = 0; correctCount = 0; usedRounds = [];
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
    el.categoryHint.textContent = '';

    // Pick a round not yet used
    let available = ROUNDS.filter((_, i) => !usedRounds.includes(i));
    if (available.length === 0) { usedRounds = []; available = ROUNDS; }
    const idx = Math.floor(Math.random() * available.length);
    const roundData = available[idx];
    usedRounds.push(ROUNDS.indexOf(roundData));

    currentOdd = roundData.odd;

    // Shuffle items
    const items = shuffle([...roundData.items]);

    el.itemsGrid.innerHTML = '';
    items.forEach(emoji => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `<div class="item-emoji">${emoji}</div>`;
      card.addEventListener('click', () => onAnswer(card, emoji, roundData.hint));
      el.itemsGrid.appendChild(card);
    });
  }

  function onAnswer(card, emoji, hint) {
    if (answered) return;
    answered = true;

    if (emoji === currentOdd) {
      card.classList.add('correct');
      score += 10;
      correctCount++;
      el.score.textContent = score;
      el.categoryHint.textContent = hint;
      Feedback.showCorrect(() => nextRound());
    } else {
      card.classList.add('wrong');
      shakeElement(card);
      el.categoryHint.textContent = hint;
      // highlight correct
      [...el.itemsGrid.children].forEach(c => {
        const e = c.querySelector('.item-emoji');
        if (e && e.textContent === currentOdd) c.classList.add('highlight');
      });
      Feedback.showWrong(() => {
        answered = false;
        el.categoryHint.textContent = '';
        [...el.itemsGrid.children].forEach(c => c.classList.remove('correct', 'wrong', 'highlight'));
      });
    }
  }

  function showComplete() {
    el.progress.style.width = '100%';
    el.gameCard.classList.add('hidden');
    el.completeScreen.classList.remove('hidden');
    const stars = Progress.calcStars(correctCount, TOTAL_ROUNDS);
    Progress.setStars('odd-one-out', stars);
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
