import React, { FC } from "react";
import apiData from '../api-response.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { RowData } from './Row';

const dataToMap = apiData;

let standingsArray: Array<RowData> = [];

const getStandingsArray = () => {

        for ( let i = 0; i < 24; i++ ) {
                const teamObject: RowData = {
                "crest": dataToMap.standings[0].table[i].team.crestUrl,
                "position": dataToMap.standings[0].table[i].position,
                "team": dataToMap.standings[0].table[i].team.name,
                "played": dataToMap.standings[0].table[i].playedGames,
                "won": dataToMap.standings[0].table[i].won,
                "drawn": dataToMap.standings[0].table[i].draw,
                "lost": dataToMap.standings[0].table[i].lost,
                "scored": dataToMap.standings[0].table[i].goalsFor,
                "conceded": dataToMap.standings[0].table[i].goalsAgainst,
                "difference": dataToMap.standings[0].table[i].goalDifference,
                "points": dataToMap.standings[0].table[i].points
        }
        standingsArray.push(teamObject);
        }
        return;
}

getStandingsArray();

const Standings: FC = () => {
        return (
        <>
        <table className="table-auto w-6/12 text-center text-green-50">
                <thead>
                        <HeadingsRow />
                </thead>
                <tbody>
                        {standingsArray.map((item) => <Row rowData={item} />)}
                </tbody>
        </table>
        </>

)}

export default Standings;
