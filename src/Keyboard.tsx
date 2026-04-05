import React from 'react';
import styles from './Keyboard.module.css';

interface KeyboardProps {
  layout: string[][];
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ layout, onKeyPress }) => (
  <div className={styles.keyboard}>
    {layout.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.keyboard_row}>
        {row.map((letter, colIndex) => (
          <button
            key={`${rowIndex}${colIndex}`}
            className={styles.key}
            onClick={() => onKeyPress(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;
