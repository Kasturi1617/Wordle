import styles from './Grid.module.css';
import messages from './messages';
import { useEffect, useState } from 'react';
import WORDS from './WORDS.ts';
import { getRandomWord, getInitialGrid, getInitialColors, isValidWord, getColorsForGuess } from './wordleUtils';
import Confetti from 'react-confetti';
import Keyboard from './Keyboard';
import { GridRow } from './GridRow';
import Popup from './GameOverPopup.tsx';
import GameOverPopup from './GameOverPopup.tsx';

function Grid() {
  const MAX_ATTEMPTS = 6;
  const WORD_LENGTH = 5;

  const KEYBOARD: string[][] = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL⏎'.split(''),
    'ZXCVBNM⌫'.split(''),
  ];

  const [targetWord, setTargetWord] = useState('');
  const [correctLetters, setCorrectLetters] = useState(0);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [winRow, setWinRow] = useState<number | null>(null);
  const [isLost, setIsLost] = useState(false);


  useEffect(() => {
    const word = getRandomWord();
    setTargetWord(word);
    console.log('Target Word:', word);
  }, []);


  const initialGrid = getInitialGrid(MAX_ATTEMPTS, WORD_LENGTH);
  const initialColors = getInitialColors(MAX_ATTEMPTS, WORD_LENGTH);

  const [gameState, setGameState] = useState({
    grid: initialGrid,
    colors: initialColors,
    currentRow: 0,
    currentCol: 0,
  });

  const handleKey = (key: string) => {
    if (correctLetters === WORD_LENGTH) {
      return;
    }
    if (key.length === 1 && key.match(/[a-zA-Z]/)) {
      setGameState(prev => {
        const { grid, currentRow, currentCol } = prev;
        const newGrid = grid.map(row => [...row]);
        if (currentCol < WORD_LENGTH) {
          newGrid[currentRow][currentCol] = key.toUpperCase();
        }

        let newCol = currentCol + 1;
        if (newCol > WORD_LENGTH) {
          newCol = WORD_LENGTH;
        }
        let newRow = currentRow;

        return {
          grid: newGrid,
          colors: prev.colors,
          currentRow: newRow,
          currentCol: newCol,
        };
      });
    } else if (key === 'Enter' || key === '⏎') {
      setGameState(prev => {
        const { grid, colors, currentRow, currentCol } = prev;
        if (currentCol < WORD_LENGTH) return prev;
        const currentWord = grid[currentRow].join('');
        if (currentWord === targetWord) {
          setWinRow(currentRow);
        }
        if (!isValidWord(currentWord)) {
          setShakeRow(currentRow);
          setTimeout(() => {
            setShakeRow(null);
          }, 1000);
          return prev;
        }
        const newColors = colors.map(row => [...row]);
        const { colors: guessColors, correctCount } = getColorsForGuess(targetWord, currentWord);
        for (let i = 0; i < WORD_LENGTH; i++) {
          newColors[currentRow][i] = guessColors[i];
        }
        setCorrectLetters(correctCount);
        if (currentRow === MAX_ATTEMPTS - 1 && correctCount < WORD_LENGTH) {
          setIsLost(true);
        }
        return {
          grid,
          colors: newColors,
          currentRow: currentRow + 1,
          currentCol: 0,
        };
      });
    } else if (key === 'Backspace' || key === '⌫') {
      setGameState(prev => {
        const { grid, currentRow, currentCol } = prev;
        const newGrid = grid.map(row => [...row]);
        let newCol = currentCol - 1;
        if (newCol < 0) {
          newCol = 0;
        }
        newGrid[currentRow][newCol] = '';

        let newRow = currentRow;

        return {
          grid: newGrid,
          colors: prev.colors,
          currentRow: newRow,
          currentCol: newCol,
        };
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    handleKey(event.key);
  };

  const handleNewGame = () => {
    const word = getRandomWord();
    setTargetWord(word);
    setGameState({
      grid: getInitialGrid(MAX_ATTEMPTS, WORD_LENGTH),
      colors: getInitialColors(MAX_ATTEMPTS, WORD_LENGTH),
      currentRow: 0,
      currentCol: 0,
    });
    setCorrectLetters(0);
    setShakeRow(null);
    setWinRow(null);
    setIsLost(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetWord, correctLetters]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong"
      ></link>
      <script src="./assets/vendor/canvas-confetti/dist/confetti.browser.js"></script>
      <h1 className={styles.title}>{messages.wordle}</h1>
      <div className={styles.main}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => (
          <GridRow
            key={index}
            rowValues={gameState.grid[index]}
            colorRow={gameState.colors[index]}
            shouldShake={shakeRow === index}
            shouldFlip={index === gameState.currentRow - 1}
            shouldPop={winRow === index}
            winRow={winRow}
            rowIndex={index}
          />
        ))}

        {gameState.currentRow === MAX_ATTEMPTS &&
          correctLetters < WORD_LENGTH && (
            <div>
              <h2 className={styles.lost}>{messages.youLost}</h2>
            </div>
          )}

        {isLost && (
          <GameOverPopup targetWord={targetWord} messages={messages} onNewGame={handleNewGame} />
        )}

        <Keyboard layout={KEYBOARD} onKeyPress={handleKey} />
      </div>
    </>
  );
}

export default Grid;
