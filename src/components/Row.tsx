import React, { FC } from 'react';
import { RowData } from '../interfaces';
interface RowProps {
  rowData: RowData;
  key: number;
  hcapPos: number;
  rowIndex: number;
  fullHcap: boolean;
}

const Row: FC<RowProps> = ({ rowData, hcapPos, fullHcap }) => {
  return (
    <>
      <tr>
        <td>
          <img src={rowData.crest} alt="club crest" className="w-4" />
        </td>
        <td className="dark:text-blue-900 text-white">{rowData.position}</td>
        <td className="dark:text-orange-400 text-orange-300">{hcapPos}</td>
        <td className="px-2 sm:px-8 dark:text-blue-900 text-white">
          {rowData.team}
        </td>
        <td className="dark:text-blue-900 text-white">{rowData.played}</td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.won}
        </td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.drawn}
        </td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.lost}
        </td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.scored}
        </td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.conceded}
        </td>
        <td className="hidden sm:table-cell dark:text-blue-900 text-white">
          {rowData.difference}
        </td>
        <td className="dark:text-blue-900 text-white">{rowData.points}</td>
        <td className="dark:text-orange-400 text-orange-300">
          {rowData.handicap}
        </td>
        <td className="dark:text-orange-400 text-orange-300">{rowData.hppg}</td>
        {fullHcap ? (
          <td className="dark:text-emerald-400 text-lime-200">
            {rowData.totalWithHcap}
          </td>
        ) : (
          <td className="dark:text-emerald-400 text-lime-200">
            {rowData.total}
          </td>
        )}
      </tr>
    </>
  );
};

export default Row;
