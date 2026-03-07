/* identify-fruits.js — Fruits & Vegetables Identification */

(function () {
  const ITEMS = [
    // Fruits
    { emoji: '🥭', name: 'Mango',      nameHi: 'आम',      type: 'fruit' },
    { emoji: '🍌', name: 'Banana',     nameHi: 'केला',    type: 'fruit' },
    { emoji: '🍈', name: 'Guava',      nameHi: 'अमरूद',  type: 'fruit' },
    { emoji: '🥥', name: 'Coconut',    nameHi: 'नारियल', type: 'fruit' },
    { emoji: '🍋', name: 'Lemon',      nameHi: 'नींबू',  type: 'fruit' },
    { emoji: '🍊', name: 'Orange',     nameHi: 'संतरा',  type: 'fruit' },
    { emoji: '🍎', name: 'Apple',      nameHi: 'सेब',    type: 'fruit' },
    { emoji: '🍇', name: 'Grapes',     nameHi: 'अंगूर',  type: 'fruit' },
    { emoji: '🍉', name: 'Watermelon', nameHi: 'तरबूज़', type: 'fruit' },
    { emoji: '🍑', name: 'Peach',      nameHi: 'आड़ू',   type: 'fruit' },
    // Vegetables
    { emoji: '🍆', name: 'Brinjal',    nameHi: 'बैंगन',  type: 'veg' },
    { emoji: '🌽', name: 'Corn',       nameHi: 'मक्का',  type: 'veg' },
    { emoji: '🥕', name: 'Carrot',     nameHi: 'गाजर',   type: 'veg' },
    { emoji: '🥔', name: 'Potato',     nameHi: 'आलू',    type: 'veg' },
    { emoji: '🍅', name: 'Tomato',     nameHi: 'टमाटर', type: 'veg' },
    { emoji: '🧅', name: 'Onion',      nameHi: 'प्याज',  type: 'veg' },
    { emoji: '🥦', name: 'Broccoli',   nameHi: 'ब्रोकली', type: 'veg' },
    { emoji: '🥒', name: 'Cucumber',   nameHi: 'खीरा',   type: 'veg' },
    { emoji: '🌶️', name: 'Chilli',    nameHi: 'मिर्च',  type: 'veg' },
    { emoji: '🫛', name: 'Peas',       nameHi: 'मटर',    type: 'veg' },
  ];

  const TOTAL_ROUNDS = 10;
  let round = 0, score = 0, correctCount = 0;
  let correctItem = null;
  let answered = false;

  const el = {
    roundNum:    document.getElementById('round-num'),
    totalRounds: document.getElementById('total-rounds'),
    score:       document.getElementById('score'),
    progress:    document.getElementById('progress-bar'),
    questionText:document.getElementById('question-text'),
    questionHint:document.getElementById('question-hint'),
    itemsGrid:   document.getElementById('items-grid'),
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

  function nextRound() {
    if (round >= TOTAL_ROUNDS) { showComplete(); return; }
    round++;
    answered = false;
    el.roundNum.textContent = round;
    el.progress.style.width = ((round - 1) / TOTAL_ROUNDS * 100) + '%';

    // Pick 5 random distinct items
    const shuffled = shuffle([...ITEMS]);
    const displayed = shuffled.slice(0, 5);
    correctItem = displayed[Math.floor(Math.random() * displayed.length)];

    el.questionText.textContent = `Tap the ${correctItem.name}!`;
    el.questionHint.textContent  = `${correctItem.nameHi} कहाँ है?`;

    el.itemsGrid.innerHTML = '';
    displayed.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `<div class="item-emoji">${item.emoji}</div><div class="item-label">${item.name}<br/>${item.nameHi}</div>`;
      card.addEventListener('click', () => onAnswer(card, item));
      el.itemsGrid.appendChild(card);
    });
  }

  function onAnswer(card, item) {
    if (answered) return;
    answered = true;

    if (item === correctItem) {
      card.classList.add('correct');
      score += 10;
      correctCount++;
      el.score.textContent = score;
      Feedback.showCorrect(() => nextRound());
    } else {
      card.classList.add('wrong');
      shakeElement(card);
      // highlight correct
      [...el.itemsGrid.children].forEach(c => {
        const lbl = c.querySelector('.item-label');
        if (lbl && lbl.textContent.includes(correctItem.name)) c.classList.add('highlight');
      });
      Feedback.showWrong(() => {
        answered = false;
        [...el.itemsGrid.children].forEach(c => c.classList.remove('correct', 'wrong', 'highlight'));
      });
    }
  }

  function showComplete() {
    el.progress.style.width = '100%';
    el.gameCard.classList.add('hidden');
    el.completeScreen.classList.remove('hidden');
    const stars = Progress.calcStars(correctCount, TOTAL_ROUNDS);
    Progress.setStars('identify-fruits', stars);
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
