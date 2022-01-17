import React, { FC } from 'react';
import { RowData } from '../interfaces';
import { motion } from 'framer-motion';
interface RowProps {
  rowData: RowData;
  key: number;
  hcapPos: number;
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Row: FC<RowProps> = ({ rowData, hcapPos }) => {
  return (
    <motion.tr variants={variants}>
      <td>
        <img src={rowData.crest} alt="club crest" className="w-4" />
      </td>
      <td className="text-blue-900 dark:text-white">{rowData.position}</td>
      {rowData.league !== 39 ? (
        <td className="text-orange-400 dark:text-orange-300">{hcapPos}</td>
      ) : null}
      <td className="px-8 text-blue-900 dark:text-white">{rowData.team}</td>
      <td className="text-blue-900 dark:text-white">{rowData.played}</td>
      <td className="text-blue-900 dark:text-white">{rowData.won}</td>
      <td className="text-blue-900 dark:text-white">{rowData.drawn}</td>
      <td className="text-blue-900 dark:text-white">{rowData.lost}</td>
      <td className="text-blue-900 dark:text-white">{rowData.scored}</td>
      <td className="text-blue-900 dark:text-white">{rowData.conceded}</td>
      <td className="text-blue-900 dark:text-white">{rowData.difference}</td>
      <td className="text-blue-900 dark:text-white">{rowData.points}</td>
      {rowData.league !== 39 ? (
        <td className="text-orange-400 dark:text-orange-300">
          {rowData.handicap}
        </td>
      ) : null}
      {rowData.league !== 39 ? (
        <td className="text-orange-400 dark:text-orange-300">{rowData.hppg}</td>
      ) : null}
      <td className="text-emerald-400 dark:text-lime-200">{rowData.total}</td>
    </motion.tr>
  );
};

export default Row;
