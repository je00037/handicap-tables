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
      <td>{rowData.position}</td>
      <td className="text-orange-300">{hcapPos}</td>
      <td className="px-8">{rowData.team}</td>
      <td>{rowData.played}</td>
      <td>{rowData.won}</td>
      <td>{rowData.drawn}</td>
      <td>{rowData.lost}</td>
      <td>{rowData.scored}</td>
      <td>{rowData.conceded}</td>
      <td>{rowData.difference}</td>
      <td>{rowData.points}</td>
      <td className="text-orange-300">{rowData.handicap}</td>
      <td className="text-orange-300">{rowData.hppg}</td>
      <td className="text-lime-200">{rowData.total}</td>
    </tr>
  );
};

export default Row;
