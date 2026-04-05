import React from 'react';
import styles from './Grid.module.css';

interface CellProps {
  value: string;
  colorClass: string;
  isFlipped: boolean;
  isPopped: boolean;
  popClass?: string;
}

export const Cell: React.FC<CellProps> = ({ value, colorClass, isFlipped, isPopped, popClass }) => (
  <div
    className={[
      styles.cell,
      colorClass,
      isFlipped ? styles.flip : '',
      isPopped ? styles.pop : '',
      isPopped && popClass ? styles[popClass] : '',
    ].join(' ')}
  >
    {value}
  </div>
);

interface GridRowProps {
  rowValues: string[];
  colorRow: string[];
  isShaking: boolean;
  isFlipped: boolean;
  isPopped: boolean;
  winRow: number | null;
  rowIndex: number;
}

export const GridRow: React.FC<GridRowProps> = ({
  rowValues,
  colorRow,
  isShaking,
  isFlipped,
  isPopped,
  winRow,
  rowIndex,
}) => (
  <div className={`${styles.row} ${isShaking ? styles.shake : ''}`}>
    {rowValues.map((cell, cellIndex) => (
      <Cell
        key={cellIndex}
        value={cell}
        colorClass={colorRow[cellIndex]}
        isFlipped={isFlipped}
        isPopped={isPopped}
        popClass={isPopped ? `pop${cellIndex}` : ''}
      />
    ))}
  </div>
);
