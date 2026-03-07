# मज़ेदार सीखना – Kids Fun Learn 🌈

A complete set of **100% static** educational web pages for kids aged 4–6, designed for an Indian audience. All activities use Hindi + English labels, Indian cultural context, and colorful emoji-based UI — no build tools, no server, just open in a browser or host on GitHub Pages.

## 🎮 Activities

| Activity | File | Ages | Description |
|---|---|---|---|
| 🔢 Counting | `counting.html` | 4–6 | Count Indian objects (mangoes, diyas, stars…) and tap the right number |
| 🎨 Color by Number | `color-by-number.html` | 4–6 | Color SVG drawings (Diya, Rangoli, Lotus) by tapping color + region |
| 🥕 Fruits & Veggies | `identify-fruits.html` | 4–5 | Tap the named fruit/vegetable from a grid (Hindi + English) |
| 🐄 Animals | `identify-animals.html` | 4–5 | Identify Indian animals (cow/गाय, peacock/मोर, elephant/हाथी, …) |
| 🧩 Shape Matching | `shape-matching.html` | 4–5 | Match colored shapes to their outlines |
| 🔀 Odd One Out | `odd-one-out.html` | 5–6 | Find the item that doesn't belong in the group |
| 📐 Pattern | `pattern.html` | 5–6 | Complete the ABAB / AABB / ABC sequence |
| ➕ Simple Math | `math.html` | 5–6 | Visual addition & subtraction using emoji objects |

## 🚀 How to Use

### Option 1 — Open Locally
Just double-click `index.html` in your browser. No server required.

### Option 2 — GitHub Pages
1. Fork this repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Visit `https://<your-username>.github.io/kids-fun-learn/`

## ✨ Features
- **Confetti + sound** on every correct answer
- **Star ratings** (1–3 ⭐) saved per activity in `localStorage`
- **Hindi + English** throughout
- **Mobile-first** responsive design (min 60px tap targets)
- **No external dependencies** except Google Fonts (loaded from CDN)
- **Culturally Indian** — Indian fruits, vegetables, animals, festivals

## 📁 Project Structure
```
kids-fun-learn/
├── index.html              # Landing page / activity hub
├── counting.html           # Counting game
├── color-by-number.html    # Color by number activity
├── identify-fruits.html    # Fruit & veggie identification
├── identify-animals.html   # Animal identification
├── shape-matching.html     # Shape matching game
├── odd-one-out.html        # Odd one out game
├── pattern.html            # Pattern completion
├── math.html               # Simple math activity
├── css/
│   └── style.css           # Shared styles (bright, colorful, kid-friendly)
└── js/
    ├── common.js           # Shared utilities (confetti, feedback, progress)
    ├── counting.js
    ├── color-by-number.js
    ├── identify-fruits.js
    ├── identify-animals.js
    ├── shape-matching.js
    ├── odd-one-out.js
    ├── pattern.js
    └── math.js
```

## 🎨 Design
- Font: **Baloo 2** (Google Fonts) — kid-friendly rounded font
- Colors: Bright orange, teal, yellow, pink, green
- Emojis used for all graphics — no image files needed

## 🌍 Cultural Context (Indian)
- Fruits: Mango (आम), Banana (केला), Guava (अमरूद), Coconut (नारियल), Lemon (नींबू)
- Vegetables: Brinjal (बैंगन), Okra (भिंडी), Potato (आलू), Tomato (टमाटर), Carrot (गाजर)
- Animals: Cow (गाय), Peacock (मोर), Elephant (हाथी), Parrot (तोता), Tiger (बाघ), Camel (ऊँट)
- Encouragement: शाबाश! · बहुत बढ़िया! · सही जवाब! · फिर से कोशिश करो!
