import React, { FC } from "react";
import handicaps from '../handicaps.json';

const handicapData = handicaps;

export interface RowData {
    crest: string,
    position: number | string;
    team: string;
    played: number | string;
    won: number | string;
    drawn: number | string;
    lost: number | string;
    scored: number | string;
    conceded: number | string;
    difference: number | string;
    points: number | string;
    // hppg: number;
    // total: number;
    // handicap: number;
}

interface RowProps {
        rowData: RowData;
    }

const Row: FC<RowProps> = ( {rowData} ) => {
    return (
        <tr>
            <td><img src={rowData.crest} alt="club crest" className="w-4" /></td>
            <td>{rowData.position}</td>
            <td>{rowData.team}</td>
            <td>{rowData.played}</td>
            <td>{rowData.won}</td>
            <td>{rowData.drawn}</td>
            <td>{rowData.lost}</td>
            <td>{rowData.scored}</td>
            <td>{rowData.conceded}</td>
            <td>{rowData.difference}</td>
            <td>{rowData.points}</td>
            {/* <td>{rowData.hppg}</td>
            <td>{rowData.total}</td>
            <td>{rowData.handicap}</td> */}
        </tr> 
    )
};

export default Row;