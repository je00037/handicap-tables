import React, { FC } from "react";
import handicaps from '../handicaps.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { RowData } from './Row';
interface StandingsProps {
        data: any //fix this in future to a better type
}

const handicapData = handicaps;

let standingsArray: Array<RowData> = [];

const sortStandings = (a: any, b: any) => {
        return (b.total - a.total)
}

const Standings: FC<StandingsProps> = ( {data} ) => {

        const getStandingsArray = (data: any) => {
                for ( let i = 0; i < 24; i++ ) {
                        let currentTeamId = data.standings[0].table[i].team.id;
                        let currentTeamHandicapObject = handicapData.find(item => item.id === currentTeamId);
                        let currentTeamHandicap = currentTeamHandicapObject!.handicaps[0].value; 
                        let currentTeamHppg = currentTeamHandicapObject!.handicaps[0].hppg; 
                        let currentTeamGamesPlayed = data.standings[0].table[i].playedGames;
                        let currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg!;
                        let currentTeamTotal = data.standings[0].table[i].points + currentTeamCurrentHcap;
        
                        const teamObject: RowData = {
                        "crest": data.standings[0].table[i].team.crestUrl,
                        "position": data.standings[0].table[i].position,
                        "team": currentTeamHandicapObject!.team,
                        "played": data.standings[0].table[i].playedGames,
                        "won": data.standings[0].table[i].won,
                        "drawn": data.standings[0].table[i].draw,
                        "lost": data.standings[0].table[i].lost,
                        "scored": data.standings[0].table[i].goalsFor,
                        "conceded": data.standings[0].table[i].goalsAgainst,
                        "difference": data.standings[0].table[i].goalDifference,
                        "points": data.standings[0].table[i].points,
                        "handicap": currentTeamHandicap,
                        "hppg": currentTeamHppg,
                        "total": currentTeamTotal.toFixed(2)
                        }
                        standingsArray.push(teamObject);
                }   
                // sort the array here based on total (points + hcap)
                standingsArray.sort((a: any, b: any) => {
                        return (b.total - a.total)
                });
        } 

        getStandingsArray(data);

        return (
        <>
        <table className="table-auto w-6/12 text-center text-green-50">
                <thead>
                        <HeadingsRow />
                </thead>
                <tbody>
                        {standingsArray.map((item, index) => <Row rowData={item} key={index} />)}
                </tbody>
        </table>
        </>
)}

export default Standings;
