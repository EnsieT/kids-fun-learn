/* color-by-number.js — Color by Number Logic */

(function () {
  const COLORS = [
    { num: 1, name: 'Red',    nameHi: 'लाल',    hex: '#E74C3C' },
    { num: 2, name: 'Blue',   nameHi: 'नीला',   hex: '#3498DB' },
    { num: 3, name: 'Green',  nameHi: 'हरा',    hex: '#27AE60' },
    { num: 4, name: 'Yellow', nameHi: 'पीला',   hex: '#F1C40F' },
    { num: 5, name: 'Orange', nameHi: 'नारंगी', hex: '#E67E22' },
    { num: 6, name: 'Purple', nameHi: 'बैंगनी', hex: '#9B59B6' },
    { num: 7, name: 'Pink',   nameHi: 'गुलाबी', hex: '#E91E8C' },
  ];

  // Three patterns: Diya, Rangoli, Lotus
  const PATTERNS = [
    {
      title: 'Diya (Lamp)',
      titleHi: 'दिया',
      colors: [1, 2, 3, 4, 5],
      svg: `
        <svg class="coloring-svg" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
          <!-- Base of diya -->
          <ellipse class="region" data-num="5" cx="150" cy="220" rx="100" ry="30" fill="#FFE5CC"/>
          <!-- Bowl -->
          <path class="region" data-num="1" d="M60 200 Q80 140 150 130 Q220 140 240 200 Q200 230 150 235 Q100 230 60 200Z" fill="#FFD5B5"/>
          <!-- Flame outer -->
          <ellipse class="region" data-num="4" cx="150" cy="95" rx="22" ry="42" fill="#FFE066"/>
          <!-- Flame inner -->
          <ellipse class="region" data-num="1" cx="150" cy="100" rx="11" ry="24" fill="#FFB700"/>
          <!-- Wick -->
          <rect class="region" data-num="3" x="145" y="128" width="10" height="18" rx="3" fill="#8B6914"/>
          <!-- Oil surface -->
          <ellipse class="region" data-num="2" cx="150" cy="178" rx="55" ry="16" fill="#AED6F1"/>
          <!-- Left decoration -->
          <circle class="region" data-num="3" cx="85" cy="192" r="12" fill="#A9DFBF"/>
          <!-- Right decoration -->
          <circle class="region" data-num="3" cx="215" cy="192" r="12" fill="#A9DFBF"/>
          <!-- Number labels -->
          <text x="150" y="225" text-anchor="middle" font-size="18" font-weight="bold" fill="#fff" pointer-events="none">5</text>
          <text x="150" y="183" text-anchor="middle" font-size="14" fill="#fff" pointer-events="none">1</text>
          <text x="150" y="178" text-anchor="middle" font-size="14" fill="rgba(0,0,0,0.5)" pointer-events="none">2</text>
          <text x="150" y="97"  text-anchor="middle" font-size="16" fill="rgba(0,0,0,0.6)" pointer-events="none">4</text>
          <text x="150" y="112" text-anchor="middle" font-size="12" fill="rgba(0,0,0,0.5)" pointer-events="none">1</text>
          <text x="85"  y="196" text-anchor="middle" font-size="14" fill="#fff" pointer-events="none">3</text>
          <text x="215" y="196" text-anchor="middle" font-size="14" fill="#fff" pointer-events="none">3</text>
        </svg>`,
    },
    {
      title: 'Rangoli Star',
      titleHi: 'रंगोली',
      colors: [1, 2, 3, 4, 5, 6],
      svg: `
        <svg class="coloring-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer circle petals -->
          <circle class="region" data-num="2" cx="150" cy="150" r="130" fill="#D6EAF8"/>
          <!-- Star points -->
          <polygon class="region" data-num="1" points="150,20 165,100 230,60 175,130 260,130 190,165 240,230 160,190 170,270 150,200 130,270 140,190 60,230 110,165 40,130 125,130 70,60 135,100" fill="#FADBD8"/>
          <!-- Center hex -->
          <polygon class="region" data-num="4" points="150,105 180,120 195,150 180,180 150,195 120,180 105,150 120,120" fill="#FDEBD0"/>
          <!-- Inner circle -->
          <circle class="region" data-num="3" cx="150" cy="150" r="32" fill="#D5F5E3"/>
          <!-- Small dots around -->
          <circle class="region" data-num="5" cx="150" cy="50"  r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="220" cy="90"  r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="240" cy="170" r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="190" cy="240" r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="110" cy="240" r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="60"  cy="170" r="10" fill="#FAD7A0"/>
          <circle class="region" data-num="5" cx="80"  cy="90"  r="10" fill="#FAD7A0"/>
          <!-- Center dot -->
          <circle class="region" data-num="6" cx="150" cy="150" r="14" fill="#D7BDE2"/>
          <!-- Labels -->
          <text x="150" y="55"  text-anchor="middle" font-size="12" fill="rgba(0,0,0,0.6)" pointer-events="none">5</text>
          <text x="150" y="155" text-anchor="middle" font-size="14" fill="rgba(0,0,0,0.6)" pointer-events="none">3</text>
          <text x="150" y="155" dy="18" text-anchor="middle" font-size="11" fill="rgba(0,0,0,0.5)" pointer-events="none">6</text>
          <text x="36"  y="154" text-anchor="middle" font-size="14" fill="rgba(0,0,0,0.5)" pointer-events="none">2</text>
          <text x="150" y="130" text-anchor="middle" font-size="12" fill="rgba(0,0,0,0.5)" pointer-events="none">4</text>
          <text x="150" y="80"  text-anchor="middle" font-size="13" fill="rgba(0,0,0,0.5)" pointer-events="none">1</text>
        </svg>`,
    },
    {
      title: 'Lotus Flower',
      titleHi: 'कमल का फूल',
      colors: [1, 3, 4, 5, 7],
      svg: `
        <svg class="coloring-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Water -->
          <ellipse class="region" data-num="3" cx="150" cy="260" rx="130" ry="28" fill="#A8E6CF"/>
          <!-- Stem -->
          <rect class="region" data-num="3" x="143" y="200" width="14" height="65" rx="5" fill="#27AE60"/>
          <!-- Outer petals -->
          <ellipse class="region" data-num="7" cx="90"  cy="180" rx="30" ry="55" fill="#F8BBD0" transform="rotate(-30,90,180)"/>
          <ellipse class="region" data-num="7" cx="210" cy="180" rx="30" ry="55" fill="#F8BBD0" transform="rotate(30,210,180)"/>
          <ellipse class="region" data-num="7" cx="60"  cy="130" rx="28" ry="55" fill="#F8BBD0" transform="rotate(-55,60,130)"/>
          <ellipse class="region" data-num="7" cx="240" cy="130" rx="28" ry="55" fill="#F8BBD0" transform="rotate(55,240,130)"/>
          <!-- Inner petals -->
          <ellipse class="region" data-num="1" cx="115" cy="140" rx="22" ry="52" fill="#FFCDD2" transform="rotate(-20,115,140)"/>
          <ellipse class="region" data-num="1" cx="185" cy="140" rx="22" ry="52" fill="#FFCDD2" transform="rotate(20,185,140)"/>
          <ellipse class="region" data-num="1" cx="150" cy="110" rx="22" ry="52" fill="#FFCDD2"/>
          <!-- Center -->
          <circle class="region" data-num="4" cx="150" cy="152" r="34" fill="#FFF9C4"/>
          <!-- Pollen dots -->
          <circle class="region" data-num="5" cx="150" cy="140" r="10" fill="#FFCC02"/>
          <!-- Labels -->
          <text x="150" y="265" text-anchor="middle" font-size="13" fill="rgba(0,0,0,0.5)" pointer-events="none">3</text>
          <text x="150" y="155" text-anchor="middle" font-size="14" fill="rgba(0,0,0,0.5)" pointer-events="none">4</text>
          <text x="150" y="143" text-anchor="middle" font-size="11" fill="rgba(0,0,0,0.5)" pointer-events="none">5</text>
          <text x="150" y="100" text-anchor="middle" font-size="13" fill="rgba(0,0,0,0.4)" pointer-events="none">1</text>
          <text x="90"  y="185" text-anchor="middle" font-size="13" fill="rgba(0,0,0,0.4)" pointer-events="none">7</text>
          <text x="210" y="185" text-anchor="middle" font-size="13" fill="rgba(0,0,0,0.4)" pointer-events="none">7</text>
        </svg>`,
    },
  ];

  let currentPatternIdx = 0;
  let selectedColor = null;
  let colored = {};  // regionId -> colorNum

  const el = {
    patternNum:    document.getElementById('pattern-num'),
    patternTotal:  document.getElementById('pattern-total'),
    patternTitle:  document.getElementById('pattern-title'),
    patternTitleHi:document.getElementById('pattern-title-hi'),
    legend:        document.getElementById('color-legend'),
    svgContainer:  document.getElementById('svg-container'),
    resetBtn:      document.getElementById('reset-btn'),
    prevBtn:       document.getElementById('prev-pattern'),
    nextBtn:       document.getElementById('next-pattern'),
    completeScreen:document.getElementById('complete-screen'),
    finalStars:    document.getElementById('final-stars'),
    nextCompleteBtn: document.getElementById('next-btn'),
  };

  el.patternTotal.textContent = PATTERNS.length;
  el.nextCompleteBtn.addEventListener('click', () => {
    el.completeScreen.classList.add('hidden');
    currentPatternIdx = (currentPatternIdx + 1) % PATTERNS.length;
    loadPattern();
  });

  el.resetBtn.addEventListener('click', () => {
    colored = {};
    loadPattern();
  });

  el.prevBtn.addEventListener('click', () => {
    currentPatternIdx = (currentPatternIdx - 1 + PATTERNS.length) % PATTERNS.length;
    loadPattern();
  });

  el.nextBtn.addEventListener('click', () => {
    currentPatternIdx = (currentPatternIdx + 1) % PATTERNS.length;
    loadPattern();
  });

  function loadPattern() {
    selectedColor = null;
    const p = PATTERNS[currentPatternIdx];
    el.patternNum.textContent   = currentPatternIdx + 1;
    el.patternTitle.textContent  = p.title;
    el.patternTitleHi.textContent = p.titleHi;
    el.completeScreen.classList.add('hidden');

    // Build legend
    el.legend.innerHTML = '';
    p.colors.forEach(num => {
      const c = COLORS.find(c => c.num === num);
      if (!c) return;
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.dataset.num = num;
      item.innerHTML = `<div class="legend-swatch" style="background:${c.hex}"></div>${num}. ${c.name} / ${c.nameHi}`;
      item.addEventListener('click', () => selectColor(num, item));
      el.legend.appendChild(item);
    });

    // Build SVG
    el.svgContainer.innerHTML = p.svg;
    const regions = el.svgContainer.querySelectorAll('.region');
    regions.forEach((r, i) => {
      r.dataset.id = i;
      const num = +r.dataset.num;
      // restore colored
      if (colored[i] !== undefined) {
        const c = COLORS.find(c => c.num === colored[i]);
        if (c) r.setAttribute('fill', c.hex);
      } else {
        r.setAttribute('fill', '#F5F5F5');
      }
      r.addEventListener('click', () => colorRegion(r, num));
    });
  }

  function selectColor(num, item) {
    selectedColor = num;
    el.legend.querySelectorAll('.legend-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }

  function colorRegion(region, expectedNum) {
    if (selectedColor === null) {
      // No color selected — flash the legend
      el.legend.style.outline = '3px solid var(--error)';
      setTimeout(() => el.legend.style.outline = '', 600);
      return;
    }
    const c = COLORS.find(c => c.num === selectedColor);
    if (!c) return;

    region.setAttribute('fill', c.hex);
    colored[region.dataset.id] = selectedColor;

    if (selectedColor === expectedNum) {
      region.classList.add('bounce');
      Sound.correct();
      region.addEventListener('animationend', () => region.classList.remove('bounce'), { once: true });
    } else {
      // wrong color — still allow coloring but no sound celebration
    }

    checkComplete();
  }

  function checkComplete() {
    const regions = el.svgContainer.querySelectorAll('.region');
    const p = PATTERNS[currentPatternIdx];
    let total = 0, correct = 0;
    regions.forEach((r, i) => {
      total++;
      const expected = +r.dataset.num;
      if (colored[i] === expected) correct++;
    });
    if (correct === total) {
      const stars = 3; // they colored everything correctly
      Progress.setStars('color-by-number', stars);
      el.finalStars.textContent = starsHTML(stars);
      setTimeout(() => {
        el.completeScreen.classList.remove('hidden');
        Confetti.launch(120);
        Sound.complete();
      }, 400);
    }
  }

  loadPattern();
})();
