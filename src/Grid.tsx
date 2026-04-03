import styles from './Grid.module.css';
import { useEffect, useState } from 'react';
import WORDS from './WORDS.ts';

function Grid() {
  const MAX_ATTEMPTS = 6;
  const WORD_LENGTH = 5;

  const KEYBOARD: string[][] = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL⏎'.split(''),
    'ZXCVBNM⌫'.split(''),
  ];

  const [targetWord, setTargetWord] = useState('');

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

  const [invalidWord, setInvalidWord] = useState(false);

  const validateEnteredWord = (word: string) => {
    setGameState(prev => {
      const newColors = prev.colors.map(row => [...row]);

      for (let i = 0; i < WORD_LENGTH; i++) {
        if (targetWord[i] === word[i]) {
          newColors[prev.currentRow][i] = styles.green;
        } else if (targetWord.includes(word[i])) {
          newColors[prev.currentRow][i] = styles.yellow;
        }
      }

      return {
        ...prev,
        colors: newColors,
      };
    });
  };

  const handleKey = (key: string) => {
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
        console.log(currentWord);

        if (!WORDS.includes(currentWord.toLowerCase())) {
          setInvalidWord(true);
          setTimeout(() => setInvalidWord(false), 1000);
          return prev;
        }

        const newColors = colors.map(row => [...row]);
        console.log('Targetword: ', targetWord);

        for (let i = 0; i < WORD_LENGTH; i++) {
          if (targetWord[i] === currentWord[i]) {
            console.log('Green:', currentWord[i]);
            newColors[currentRow][i] = styles.green;
          } else if (targetWord.includes(currentWord[i])) {
            console.log('Yellow:', currentWord[i]);
            newColors[currentRow][i] = styles.yellow;
          }
        }

        console.log(newColors);

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetWord]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong"
      ></link>
      <h1 className={styles.title}>Wordle</h1>
      {invalidWord && <div className={styles.error}>Not a valid word</div>}
      <div className={styles.main}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
          return (
            <div key={index} className={styles.row}>
              {Array.from({ length: WORD_LENGTH }).map((_, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className={`${styles.cell} 
                    ${gameState.colors[index][cellIndex]} 
                    ${index === gameState.currentRow - 1 ? styles.flip : ''}`}
                  >
                    {gameState.grid[index][cellIndex]}
                  </div>
                );
              })}
            </div>
          );
        })}

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
