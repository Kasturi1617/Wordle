import React from 'react';
import rowStyles from './GridRow.module.css';
import cellStyles from './Cell.module.css';

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
      cellStyles.cell,
      cellStyles[colorClass] || '',
      isFlipped ? cellStyles.flip : '',
      isPopped ? cellStyles.pop : '',
      isPopped && popClass ? cellStyles[popClass] : '',
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
  <div className={`${rowStyles.row} ${isShaking ? cellStyles.shake : ''}`}>
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
