import React from 'react';
import rowStyles from './css/GridRow.module.css';
import cellStyles from './css/Cell.module.css';

interface CellProps {
  value: string;
  colorClass: string;
  shouldFlip: boolean;
  shouldPop: boolean;
  popClass?: string;
}

export const Cell: React.FC<CellProps> = ({ value, colorClass, shouldFlip, shouldPop, popClass }) => (
  <div
    className={[
      cellStyles.cell,
      cellStyles[colorClass] || '',
      shouldFlip ? cellStyles.flip : '',
      shouldPop ? cellStyles.pop : '',
      shouldPop && popClass ? cellStyles[popClass] : '',
    ].join(' ')}
  >
    {value}
  </div>
);

interface GridRowProps {
  rowValues: string[];
  colorRow: string[];
  shouldShake: boolean;
  shouldFlip: boolean;
  shouldPop: boolean;
  winRow: number | null;
  rowIndex: number;
}

export const GridRow: React.FC<GridRowProps> = ({
  rowValues,
  colorRow,
  shouldShake,
  shouldFlip,
  shouldPop,
  winRow,
  rowIndex,
}) => (
  <div className={`${rowStyles.row} ${shouldShake ? cellStyles.shake : ''}`}>
    {rowValues.map((cell, cellIndex) => (
      <Cell
        key={cellIndex}
        value={cell}
        colorClass={colorRow[cellIndex]}
        shouldFlip={shouldFlip}
        shouldPop={shouldPop}
        popClass={shouldPop ? `pop${cellIndex}` : ''}
      />
    ))}
  </div>
);
