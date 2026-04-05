import WORDS from '../constants/WORDS';

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].toUpperCase();
}

export function isValidWord(word: string): boolean {
  return WORDS.includes(word.toLowerCase());
}

export function getInitialGrid(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(''));
}

export function getInitialColors(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(''));
}

export function getColorsForGuess(targetWord: string, guess: string): { colors: string[], correctCount: number } {
  let colors = Array(targetWord.length).fill('');
  let correctCount = 0;
  const targetArr = targetWord.split('');
  const guessArr = guess.split('');

  for (let i = 0; i < targetArr.length; i++) {
    if (guessArr[i] === targetArr[i]) {
      colors[i] = 'green';
      correctCount++;
      targetArr[i] = null as any;
      guessArr[i] = null as any;
    }
  }

  for (let i = 0; i < guessArr.length; i++) {
    if (colors[i] === '' && guessArr[i] !== null) {
      const idx = targetArr.indexOf(guessArr[i]);
      if (idx !== -1) {
        colors[i] = 'yellow';
        targetArr[idx] = null as any;
      }
    }
  }

  return { colors, correctCount };
}
