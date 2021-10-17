import React, { FC } from "react";

// definitions for each handicap column heading: 
// points incl hcap = normal points plus the hppg value for games played so far, so 10 points plus (hppg * games played so far)
//

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
    handicap: number | string;
    hppg: number | string;
    total: number | string;
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
            <td className="text-orange-300">{rowData.handicap}</td>
            <td className="text-orange-300">{rowData.hppg}</td>
            <td className="text-orange-400">{rowData.total}</td>
        </tr> 
    )
};

export default Row;