import styles from './Grid.module.css';
import messages from './messages';
import { useEffect, useState } from 'react';
import WORDS from './WORDS.ts';
import Confetti from 'react-confetti';

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
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const word = WORDS[randomIndex].toUpperCase();
    setTargetWord(word);
    console.log('Target Word:', word);
  }, []);

  const initialGrid = Array.from({ length: MAX_ATTEMPTS }, () =>
    Array(WORD_LENGTH).fill(''),
  );

  const initialColors = Array.from({ length: MAX_ATTEMPTS }, () =>
    Array(WORD_LENGTH).fill(''),
  );

  const [gameState, setGameState] = useState({
    grid: initialGrid,
    colors: initialColors,
    currentRow: 0,
    currentCol: 0,
  });

  const handleKey = (key: string) => {
    if (correctLetters === WORD_LENGTH) {
      console.log('Game already won, ignoring input');
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

        if (!WORDS.includes(currentWord.toLowerCase())) {
          setShakeRow(currentRow);
          setTimeout(() => {
            setShakeRow(null);
          }, 1000);
          return prev;
        }

        const newColors = colors.map(row => [...row]);
        console.log('Targetword: ', targetWord);
        var count = 0;

        for (let i = 0; i < WORD_LENGTH; i++) {
          if (targetWord[i] === currentWord[i]) {
            newColors[currentRow][i] = styles.green;
            count++;
          } else if (targetWord.includes(currentWord[i])) {
            newColors[currentRow][i] = styles.yellow;
          }
        }
        setCorrectLetters(count);

        if (currentRow === MAX_ATTEMPTS - 1 && count < WORD_LENGTH) {
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
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const word = WORDS[randomIndex].toUpperCase();
    setTargetWord(word);
    setGameState({
      grid: initialGrid,
      colors: initialColors,
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
        {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
          return (
            <div
              key={index}
              className={`${styles.row} ${shakeRow === index ? styles.shake : ''}`}
            >
              {Array.from({ length: WORD_LENGTH }).map((_, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className={`${styles.cell} 
                    ${gameState.colors[index][cellIndex]} 
                    ${index === gameState.currentRow - 1 ? styles.flip : ''} 
                    ${winRow === index ? styles.pop : ''} 
                    ${winRow === index ? styles[`pop${cellIndex}`] : ''}`}
                  >
                    {gameState.grid[index][cellIndex]}
                  </div>
                );
              })}
            </div>
          );
        })}

        {gameState.currentRow === MAX_ATTEMPTS &&
          correctLetters < WORD_LENGTH && (
            <div>
              <h2 className={styles.lost}>{messages.lost}</h2>
            </div>
          )}

        {isLost && (
          <div className={styles.popup}>
            <div className={styles.popupTitle}>{messages.lost}</div>
            <div className={styles.popupContent}>
              <p>The answer was:</p>
              <h1 className={styles.targetWord}>{targetWord}</h1>
              <a
                href={`https://www.google.com/search?q=define+${targetWord}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                What does this word mean?
              </a>
              <button className={styles.newGame} onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        )}

        <div className={styles.keyboard}>
          {KEYBOARD.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className={styles.keyboard_row}>
                {row.map((letter, colIndex) => {
                  return (
                    <button
                      key={`${rowIndex}${colIndex}`}
                      className={styles.key}
                      onClick={() => {
                        handleKey(letter);
                      }}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Grid;
