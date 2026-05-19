# 🎮 Rock, Paper, Scissors Game

## 📚 Description

This is a **Rock, Paper, Scissors game** built with vanilla HTML5, CSS3, and JavaScript (ES6+). It's a fully functional browser-based game where users play against the computer with real-time score tracking using the browser's `localStorage` API.

### Key Features:

- ✅ Play against computer AI
- ✅ Persistent score tracking using localStorage
- ✅ Keyboard shortcuts (R, P, S keys)
- ✅ Visual feedback with emoji images
- ✅ Responsive design
- ✅ Real-time game result display
- ✅ Score persistence across page refreshes

### Key Learning Outcomes:

- DOM manipulation with vanilla JavaScript
- Event listeners (click and keyboard events)
- LocalStorage API for persistent data
- Game logic implementation
- HTML5 semantic structure
- CSS3 styling and animations
- ES6+ JavaScript syntax (arrow functions, template literals)

## 🛠️ Technologies Used

| Technology             | Purpose                     | Version |
| ---------------------- | --------------------------- | ------- |
| **HTML5**              | Semantic markup & structure | 5       |
| **CSS3**               | Styling, Flexbox & layout   | 3       |
| **Vanilla JavaScript** | Game logic & interactivity  | ES6+    |
| **LocalStorage API**   | Persistent score storage    | Native  |
| **Images/Emojis**      | Visual game representation  | .png    |

## 📁 Project Structure

```
tp1/
├── functions2-r-s-p.html    # Main HTML file (game interface)
├── functions2-r-s-p.js      # Game logic (functions & event listeners)
├── style.css                # Styling and animations
├── images/
│   ├── rock-emoji.png       # Rock image
│   ├── paper-emoji.png      # Paper image
│   └── scissors-emoji.png   # Scissors image
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### How to Run Locally

#### Option 1: Direct File (Simplest)

```bash
# Navigate to the tp1 folder
cd tp1

# Double-click functions2-r-s-p.html to open in browser
# Or right-click → Open with Browser
```

#### Option 2: Local Server (Recommended)

```bash
# Using Python (if installed)
python -m http.server 8000

# Or using Node.js http-server
npx http-server .

# Then open in browser:
# http://localhost:8000/functions2-r-s-p.html
```

## 🎮 How to Play

### Using Mouse Buttons

1. **Click one of three buttons:**
   - 🪨 Rock
   - 📄 Paper
   - ✂️ Scissors

2. **Computer automatically plays:**
   - Computer randomly selects its move

3. **See the result instantly:**
   - Winner is displayed (You Win / You Lose / Tie)
   - Score is updated
   - Both moves shown with emoji images

4. **Play as many times as you want:**
   - Score persists across refreshes (saved in localStorage)
   - Reset button clears the score

### Using Keyboard Shortcuts

- Press **R** → Play Rock
- Press **P** → Play Paper
- Press **S** → Play Scissors

## 🎯 Game Rules

```
Rock     ✋ beats  Scissors
Scissors 🔪 beats  Paper
Paper    📋 beats  Rock
Same move = Tie
```

## 📊 Code Architecture

### HTML Structure (`functions2-r-s-p.html`)

```html
<button class="js-rock-button">Rock</button>
<button class="js-paper-button">Paper</button>
<button class="js-scissors-button">Scissors</button>

<div class="js-result"></div>
<!-- Result display -->
<div class="js-moves"></div>
<!-- Moves with images -->
<div class="js-score"></div>
<!-- Score display -->
```

### JavaScript Functions (`functions2-r-s-p.js`)

#### 1. **Score Management**

```javascript
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
```

- Loads score from localStorage on page load
- If no score exists, initializes with 0-0-0

#### 2. **Event Listeners**

```javascript
// Button clicks
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

// Keyboard shortcuts
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") playGame("rock");
  if (event.key === "p") playGame("paper");
  if (event.key === "s") playGame("scissors");
});
```

#### 3. **Main Game Function - `playGame(playerMove)`**

```javascript
function playGame(playerMove) {
  // 1. Get computer move
  const computerMove = pickComputerMove();

  // 2. Determine winner
  if (playerMove === computerMove) {
    result = "Tie";
    score.ties += 1;
  } else if (playerWon) {
    result = "You Win";
    score.wins += 1;
  } else {
    result = "You Lose";
    score.losses += 1;
  }

  // 3. Save score to localStorage
  localStorage.setItem("score", JSON.stringify(score));

  // 4. Update UI display
  updateScoreElement();
}
```

#### 4. **Computer AI - `pickComputerMove()`**

```javascript
function pickComputerMove() {
  const randomNumber = Math.random(); // 0 to 1

  // Divide into 3 equal parts
  if (randomNumber < 1 / 3) return "rock"; // 0 - 0.33
  if (randomNumber < 2 / 3) return "paper"; // 0.33 - 0.66
  return "scissors"; // 0.66 - 1
}
```

- Uses Math.random() for unpredictability
- Generates random number 0-1
- Divides into thirds for equal probability

#### 5. **UI Update - `updateScoreElement()`**

```javascript
function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
```

### CSS Styling (`style.css`)

- Flexbox layout for responsive design
- Button hover effects
- Move icons styling
- Score display formatting
- Responsive on all screen sizes

## 💾 Data Persistence (localStorage)

**How it works:**

```javascript
// Save score
localStorage.setItem("score", JSON.stringify(score));

// Load score
let score = JSON.parse(localStorage.getItem("score")) || defaults;
```

**Benefits:**

- ✅ Score persists after page refresh
- ✅ Score persists after closing browser
- ✅ Score stored locally (no server needed)
- ✅ Works offline

**To clear score:**

```javascript
// In browser console:
localStorage.removeItem("score");
// Then refresh page
```

## 🎨 Features Breakdown

### 1. **Real-time Game Logic**

- Instantly calculates winner
- Updates score immediately
- Shows both moves with images

### 2. **Keyboard Integration**

- Allows quick play without mouse
- Better accessibility
- More efficient gameplay

### 3. **Score Persistence**

- Scores saved in browser storage
- Survives page refresh
- No backend needed

### 4. **Visual Feedback**

- Emoji images for each move
- Clear result display
- Live score updates
- Responsive layout

## 🐛 Troubleshooting

**Images not loading?**

- Ensure `images/` folder is in the same directory as HTML file
- Check image filenames: `rock-emoji.png`, `paper-emoji.png`, `scissors-emoji.png`
- Verify file extensions are `.png`

**Score not persisting?**

- Check browser's localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

**Keyboard shortcuts not working?**

- Make sure page has focus
- Try clicking on page first, then press key
- Check that key is lowercase (r, p, s)

**Buttons not responding?**

- Open browser console (F12) for errors
- Verify HTML file links to JavaScript file
- Check class names match in HTML and JS

## 📚 Learning Concepts Used

### JavaScript Concepts

- ✅ Event listeners (click, keydown)
- ✅ DOM manipulation (querySelector, innerHTML)
- ✅ Template literals (backticks with ${})
- ✅ Arrow functions (ES6)
- ✅ Conditional logic (if/else)
- ✅ LocalStorage API
- ✅ JSON parsing/stringifying
- ✅ Math.random() for randomness
- ✅ Object properties and methods
- ✅ Operator precedence

### Web API Concepts

- ✅ EventListener
- ✅ LocalStorage
- ✅ DOM API
- ✅ Document object

### CSS Concepts

- ✅ Flexbox layout
- ✅ Responsive design
- ✅ Hover effects
- ✅ Semantic HTML styling

## 🎯 Next Steps / Enhancements

Consider adding:

- 🎯 Difficulty levels (Easy/Hard/Expert)
- 🎯 Best-of-3 or Best-of-5 rounds
- 🎯 Sound effects (Web Audio API)
- 🎯 Animations for transitions
- 🎯 Multiplayer mode (P vs P)
- 🎯 Statistics (win percentage, streaks)
- 🎯 Themes (light/dark mode)
- 🎯 Leaderboard with timestamps
- 🎯 Game history log
- 🎯 Mobile-optimized UI

## 📝 Notes

- **Fully client-side:** No backend or server needed
- **No dependencies:** Pure vanilla JavaScript
- **Browser compatible:** Works on all modern browsers
- **Responsive:** Looks good on mobile and desktop
- **Accessible:** Keyboard and mouse support
- **Persistent data:** Score saved locally in browser

## 🔍 Code Quality

- ✅ Clean, readable code
- ✅ Meaningful variable names
- ✅ Proper separation of concerns
- ✅ Event delegation pattern
- ✅ DRY (Don't Repeat Yourself) principle
- ✅ Comments for complex logic

## 📄 File Sizes

```
functions2-r-s-p.html  ~2 KB
functions2-r-s-p.js    ~2 KB
style.css              ~1 KB
Total Code             ~5 KB
(Images: ~100 KB)
```

---

**Created:** May 2026 | **Language:** JavaScript (Vanilla ES6+) | **Type:** Browser Game | **License:** Open Source
