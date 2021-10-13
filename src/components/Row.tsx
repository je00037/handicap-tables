import React, { FC } from "react";

interface RowData {
    position: number;
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    scored: number;
    conceded: number;
    gdiff: number;
    points: number;
    hppg: number;
    total: number;
    handicap: number;
}

interface RowProps {
        rowData: RowData
    }

const Row: FC<RowProps> = ( {rowData} ) => {
    return (
        <tr>
            <td>{rowData.position}</td>
            <td>{rowData.team}</td>
            <td>{rowData.played}</td>
            <td>{rowData.won}</td>
            <td>{rowData.drawn}</td>
            <td>{rowData.lost}</td>
            <td>{rowData.scored}</td>
            <td>{rowData.conceded}</td>
            <td>{rowData.gdiff}</td>
            <td>{rowData.points}</td>
            <td>{rowData.hppg}</td>
            <td>{rowData.total}</td>
            <td>{rowData.handicap}</td>
        </tr> 
    )
};

export default Row;