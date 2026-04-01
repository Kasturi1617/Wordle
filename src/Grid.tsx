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
    setTargetWord(WORDS[randomIndex].toUpperCase());
  }, []);

  const initialGrid = Array.from({ length: MAX_ATTEMPTS }, () =>
    Array(WORD_LENGTH).fill(''),
  );

  const [gameState, setGameState] = useState({
    grid: initialGrid,
    currentRow: 0,
    currentCol: 0,
  });

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
          currentRow: newRow,
          currentCol: newCol,
        };
      });
    } else if (key === 'Enter' || key === '⏎') {
      setGameState(prev => {
        const { grid, currentRow, currentCol } = prev;
        if (currentCol < WORD_LENGTH) {
          return prev;
        }
        const newGrid = grid.map(row => [...row]);

        let newCol = 0;
        let newRow = currentRow + 1;

        return {
          grid: newGrid,
          currentRow: newRow,
          currentCol: newCol,
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
  }, []);

  return (
    <>
      <div className={styles.main}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
          return (
            <div key={index} className={styles.row}>
              {Array.from({ length: WORD_LENGTH }).map((_, cellIndex) => {
                return (
                  <div key={cellIndex} className={styles.cell}>
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
              <div className={styles.keyboard_row}>
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
