# 🦚 Kids Fun Learn — बच्चों की पाठशाला

A collection of **fun, interactive educational activities** for children aged 4–6, built for an **Indian audience** with Hindi + English labels, Indian objects, and a bright, culturally appropriate design.

**100% static HTML/CSS/JavaScript** — no build tools, no frameworks. Hosted on [GitHub Pages](https://pages.github.com/).

---

## 🚀 How to Enable GitHub Pages

1. Push this repository to GitHub (or fork it).
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo>/`.

---

## 🎮 Activities

| Page | Activity | Ages |
|------|----------|------|
| `index.html` | 🏠 Homepage — activity cards, total stars | All |
| `counting.html` | 🔢 Counting Game — count Indian objects | 4–6 |
| `fruits-veggies.html` | 🥭 Fruits & Veggies — identify fruits and vegetables (Hindi + English) | 4–6 |
| `animals.html` | 🐘 Animals — identify Indian animals (Hindi + English) | 4–6 |
| `shapes.html` | 🔷 Shape Matching — find the matching shape | 4–6 |
| `color-by-number.html` | 🎨 Color by Number — Indian-motif pixel art (Diya, Flower, Peacock, House) | 4–6 |
| `odd-one-out.html` | 🤔 Odd One Out — which item doesn't belong? | 5–6 |
| `patterns.html` | 🔄 Pattern Completion — ABAB, AABB, ABC sequences | 5–6 |
| `math.html` | ➕ Simple Math — visual addition & subtraction with Indian objects | 4–6 |

---

## ✨ Features

- **Indian content**: Mangoes 🥭, Coconuts 🥥, Diyas 🪔, Peacocks 🦚, Hindi labels throughout
- **Bilingual**: Hindi + English on all prompts and labels
- **Gamification**: Confetti 🎉, star ratings ⭐⭐⭐, progress dots, score tracking
- **Responsive**: Works on tablets and phones — big tap targets (48px+)
- **Progress tracking**: Stars saved in `localStorage`, displayed on homepage
- **Age-appropriate difficulty**: Counting and Math scale by age (4, 5, 6)

---

## 🗂️ File Structure

```
/
├── index.html              Homepage
├── counting.html           Counting Game
├── color-by-number.html    Color by Number
├── fruits-veggies.html     Fruits & Veggies ID
├── animals.html            Animal ID
├── shapes.html             Shape Matching
├── odd-one-out.html        Odd One Out
├── patterns.html           Pattern Completion
├── math.html               Simple Math
├── css/
│   └── style.css           Shared styles
├── js/
│   └── common.js           Shared utilities (confetti, scoring, progress)
└── README.md
```

---

## 🛠️ Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- [canvas-confetti](https://github.com/catdad/canvas-confetti) via CDN for celebrations
- [Noto Sans / Noto Sans Devanagari](https://fonts.google.com/) via Google Fonts for Hindi support
- `localStorage` for progress persistence

---

Made with ❤️ for little learners 🇮🇳
