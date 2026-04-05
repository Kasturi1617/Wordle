// Utility functions for Wordle game logic
import WORDS from './WORDS';

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
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === guess[i]) {
      colors[i] = 'green';
      correctCount++;
    } else if (targetWord.includes(guess[i])) {
      colors[i] = 'yellow';
    }
  }
  return { colors, correctCount };
}
