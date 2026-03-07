# Kids Fun Learn 🎓

> मज़ेदार शिक्षा! Fun Education for Indian Kids Ages 4–6

A collection of 23 interactive, browser-based educational activities for young learners in India. 100% static HTML/CSS/JS — works on GitHub Pages, uses Web Speech API for Hindi audio, no build tools required.

## 🌐 Live Site
[https://ensiet.github.io/kids-fun-learn/](https://ensiet.github.io/kids-fun-learn/)

## 📚 Activities (23 total)

### Classic Activities (11)
1. 🔢 **Counting Game** — Count emojis, learn numbers 1–9
2. 🥭 **Fruits & Veggies** — Identify Indian fruits and vegetables
3. 🐘 **Animal Fun** — Identify animals by name
4. 🎨 **Color by Number** — Fill in colors based on numbers
5. 🔷 **Shape Matching** — Match shapes to their pairs
6. 🔀 **Odd One Out** — Find the item that doesn't belong
7. 📐 **Pattern Game** — Complete visual patterns
8. ➕ **Simple Math** — Basic addition and subtraction
9. 🔗 **Match Columns** — Draw lines to match items
10. 🃏 **Memory Game** — Find matching pairs of cards
11. 🧺 **Sort into Baskets** — Sort items into the correct categories

### New Activities (12)

#### 🏃 Motor Skills & Spatial Thinking
12. 🌀 **Maze** (भूलभुलैया) — Guide a cow 🐄 through CSS-grid mazes to the grass 🌾
13. 🧱 **Tower Build** (टावर बनाओ) — Tap to drop sliding blocks and build a tall tower

#### 🧠 Logic & Problem Solving
14. 🧩 **Jigsaw Puzzle** (जिगसॉ) — Tap-to-place emoji-art puzzles of Indian scenes (2×2 → 3×3)
15. 🐸 **Number Line** (संख्या रेखा) — Help a frog jump to the right number on a 1–10 line
16. 🏪 **Little Dukaan** (छोटी दुकान) — Fill shopkeeper orders at a pretend Indian fruit shop

#### 🎨 Creativity & Expression
17. ✏️ **Free Drawing** (चित्र बनाओ) — Draw with colors, brushes, eraser, and Hindi emoji stickers
18. 👗 **Festival Dress-Up** (कपड़े पहनाओ) — Dress a character for Diwali, Holi, Eid, and Daily life
19. 🎵 **Music Maker** (संगीत बजाओ) — Play tabla, bell, bansuri and more using Web Audio API

#### 🌍 Daily Life & Real World
20. 🌤️ **Weather Dress-Up** (मौसम) — Pick the right clothes and items for different weather
21. 🍽️ **Make a Thali** (थाली सजाओ) — Build a complete Indian thali with the correct foods

#### 👂 Language & Observation
22. 🗣️ **Sound Bingo** (आवाज़ बिंगो) — Hear a Hindi clue spoken aloud, tap the matching picture
23. 📸 **What's Missing?** (क्या गायब है?) — Memorize a scene, then find what disappeared

## 🛠️ Tech Stack
- **HTML5** — Semantic markup, no frameworks
- **CSS3** — Responsive grid/flex, animations, CSS custom properties
- **Vanilla JavaScript** — Zero dependencies, no build step
- **Web Speech API** — Hindi (hi-IN) audio prompts, no audio files needed
- **Web Audio API** — Programmatic instrument sounds (music activity)
- **localStorage** — Progress and star-rating persistence across sessions
- **Emoji** — All visuals use emoji + CSS; no external images

## 🚀 GitHub Pages Setup
1. Fork this repository
2. Go to **Settings → Pages**
3. Set Source: **Deploy from a branch → `main` → `/ (root)`**
4. Visit `https://YOUR-USERNAME.github.io/kids-fun-learn/`

## 💻 Local Development
No build step needed — open `index.html` directly, or use any static server:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## 🏗️ Architecture
```
kids-fun-learn/
├── index.html          ← Homepage with all 23 activity cards
├── js/common.js        ← Shared utilities (speech, confetti, scoring, localStorage)
├── css/style.css       ← Shared kid-friendly styles
└── activities/         ← 23 individual activity HTML files
    ├── counting.html, color-by-number.html, identify-fruits.html
    ├── identify-animals.html, shape-matching.html, odd-one-out.html
    ├── pattern.html, math.html, match-columns.html
    ├── memory-game.html, sorting-game.html
    ├── maze.html, tower-build.html, jigsaw.html, number-line.html
    ├── dukaan.html, drawing.html, dress-up.html, music.html
    ├── weather.html, thali.html, sound-bingo.html, whats-missing.html
    └── ...
```

## 📱 Device Support
- ✅ Mobile phones (360px+, touch events)
- ✅ Tablets (768px+)
- ✅ Desktops (1200px+)
- ✅ Pointer + touch + mouse

## 🎯 Design Principles
- **Hindi-first**: All prompts in Hindi with English labels
- **Big tap targets**: Minimum 48px, usually 56px+
- **Emoji-based**: No external images required
- **Encouraging**: Stars for effort, gentle feedback on mistakes
