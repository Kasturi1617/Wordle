import React from 'react';
import styles from './Grid.module.css';

interface PopupProps {
  targetWord: string;
  messages: any;
  onNewGame: () => void;
}

const Popup: React.FC<PopupProps> = ({ targetWord, messages, onNewGame }) => (
  <div className={styles.popupBackdrop}>
    <div className={styles.popup}>
      <div className={styles.popupTitle}>{messages.lost}</div>
      <div className={styles.popupContent}>
        <p>{messages.theAnswerWas}</p>
        <h1 className={styles.targetWord}>{targetWord}</h1>
        <a
          href={`https://www.google.com/search?q=define+${targetWord}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {messages.whatDoesThisWordMean}
        </a>
        <button className={styles.newGame} onClick={onNewGame}>
          {messages.newGame}
        </button>
      </div>
    </div>
  </div>
);

export default Popup;
