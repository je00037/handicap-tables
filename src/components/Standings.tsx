import React, { FC } from "react";
import handicaps from '../handicaps-2.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { RowData } from './Row';
interface StandingsProps {
        data: any //fix this in future to a better type
        bookie: string;
}


const handicapData = handicaps;

let standingsArray: Array<RowData> = [];

const Standings: FC<StandingsProps> = ( {data, bookie = 'SkyBet'} ) => {

        const getStandingsArray = (data: any) => {
                standingsArray = [];
                for ( let i = 0; i < 24; i++ ) {
                        let currentTeamId: any;
                        let currentTeamHandicapObject: any;
                        currentTeamId = data.standings[0].table[i].team.id;
                        switch(bookie) {
                                case "William Hill":
                                        currentTeamHandicapObject = handicapData.bookmaker.Hills.Championship.find(item => item.id === currentTeamId);
                                        break;
                                case "PP/BF":
                                        currentTeamHandicapObject = handicapData.bookmaker.PPBF.Championship.find(item => item.id === currentTeamId);
                                        break;
                                case "Ladbrokes":
                                        currentTeamHandicapObject = handicapData.bookmaker.Ladbrokes.Championship.find(item => item.id === currentTeamId);
                                        break;
                                case "Bet 365":
                                        currentTeamHandicapObject = handicapData.bookmaker.Bet365.Championship.find(item => item.id === currentTeamId);
                                        break;
                                case "SkyBet":
                                        currentTeamHandicapObject = handicapData.bookmaker.SkyBet.Championship.find(item => item.id === currentTeamId);
                                        break;
                        }
                        let currentTeamHandicap = currentTeamHandicapObject!.hcap; 
                        let currentTeamHppg = currentTeamHandicapObject!.ppg; 
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
