import styles from './Grid.module.css';
import { useEffect, useState } from 'react';

function Grid() {
    const MAX_ATTEMPTS = 6;
    const WORD_LENGTH = 5;

    const initialGrid = Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(''));

    const [gameState, setGameState] = useState({
        grid: initialGrid,
        currentRow: 0,
        currentCol: 0,
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
            setGameState(prev => {
                const { grid, currentRow, currentCol } = prev;
                const newGrid = grid.map(row => [...row]);
                newGrid[currentRow][currentCol] = event.key.toUpperCase();

                let newCol = currentCol + 1;
                let newRow = currentRow;
                if (newCol >= WORD_LENGTH) {
                    newCol = 0;
                    newRow = currentRow + 1;
                }

                return {
                    grid: newGrid,
                    currentRow: newRow,
                    currentCol: newCol,
                };
            });
        }
    };


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (<>
        <div className={styles.main}>
            {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
                return <div key={index} className={styles.row}>
                    {Array.from({ length: WORD_LENGTH }).map((_, cellIndex) => {
                        return <div key={cellIndex} className={styles.cell}>
                            {gameState.grid[index][cellIndex]}</div>
                    })}
                </div>
            })}
        </div>
    </>)
}

export default Grid;