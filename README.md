# Wordle Clone (React + Vite)

A modern, modular, and customizable Wordle clone built with React, TypeScript, and Vite.

## Features
- Classic Wordle gameplay (6 attempts, 5-letter words)
- Responsive UI with keyboard and grid animations
- Modular React components (Grid, Keyboard, GameOverPopup, etc.)
- Confetti animation on win (using `react-confetti`)
- Utility functions for word logic
- CSS Modules for component-scoped styling
- Easy to extend and refactor

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Running the App
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
wordle-frontend/
├── public/                # Static assets
├── src/
│   ├── App.jsx            # App entry point
│   ├── Grid.tsx           # Main game grid logic
│   ├── Keyboard.tsx       # On-screen keyboard
│   ├── GridRow.tsx        # Grid row and cell components
│   ├── GameOverPopup.tsx  # Popup for game over
│   ├── wordleUtils.ts     # Utility functions
│   ├── WORDS.ts           # Word list
│   ├── messages.ts        # UI messages
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## Customization
- **Add words:** Edit `src/WORDS.ts` to add or remove valid words.
- **Styling:** Modify or extend CSS modules in `src/` for custom themes.
- **Game logic:** Update `src/wordleUtils.ts` for custom rules.

## Dependencies
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [react-confetti](https://www.npmjs.com/package/react-confetti)
- TypeScript (optional, for type safety)

## Credits
- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html)
- Built by [Your Name]

## License
MIT
