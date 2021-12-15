import React, { FC } from 'react';
import { RowData } from '../interfaces';
interface RowProps {
  rowData: RowData;
  key: number;
  hcapPos: number;
}

const Row: FC<RowProps> = ({ rowData, hcapPos }) => {
  return (
    <tr>
      <td>
        <img src={rowData.crest} alt="club crest" className="w-4" />
      </td>
      <td className="text-blue-900 dark:text-white">{rowData.position}</td>
      <td className="text-orange-400 dark:text-orange-300">{hcapPos}</td>
      <td className="px-8 text-blue-900 dark:text-white">{rowData.team}</td>
      <td className="text-blue-900 dark:text-white">{rowData.played}</td>
      <td className="text-blue-900 dark:text-white">{rowData.won}</td>
      <td className="text-blue-900 dark:text-white">{rowData.drawn}</td>
      <td className="text-blue-900 dark:text-white">{rowData.lost}</td>
      <td className="text-blue-900 dark:text-white">{rowData.scored}</td>
      <td className="text-blue-900 dark:text-white">{rowData.conceded}</td>
      <td className="text-blue-900 dark:text-white">{rowData.difference}</td>
      <td className="text-blue-900 dark:text-white">{rowData.points}</td>
      <td className="text-orange-400 dark:text-orange-300">
        {rowData.handicap}
      </td>
      <td className="text-orange-400 dark:text-orange-300">{rowData.hppg}</td>
      <td className="text-emerald-400 dark:text-lime-200">{rowData.total}</td>
    </tr>
  );
};

export default Row;
