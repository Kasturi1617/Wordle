import React from 'react';
import styles from './css/Keyboard.module.css';

interface KeyboardProps {
  layout: string[][];
  onKeyPress: (key: string) => void;
  letterStatus?: Record<string, 'green' | 'yellow' | 'gray'>;
}

const Keyboard: React.FC<KeyboardProps> = ({ layout, onKeyPress, letterStatus = {} }) => (
  <div className={styles.keyboard}>
    {layout.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.keyboard_row}>
        {row.map((letter, colIndex) => {
          let keyClass = styles.key;
          const status = letterStatus[letter];
          if (status === 'green') keyClass += ' ' + styles.keyGreen;
          else if (status === 'yellow') keyClass += ' ' + styles.keyYellow;
          else if (status === 'gray') keyClass += ' ' + styles.keyGray;
          return (
            <button
              key={`${rowIndex}${colIndex}`}
              className={keyClass}
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    ))}
  </div>
);

export default Keyboard;
