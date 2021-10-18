import React, { useState, FC } from "react";
import apiData from '../api-response.json';
import handicaps from '../handicaps.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { RowData } from './Row';

// THINK THE PROBLEM HERE IS THAT THE LET ISNT AVAILABLE IN THE FOR LOOP DUE TO SCOPING RULES...NEED IT TO BE A CONST
// TRY CALLING API IN THE APP COMPONENT AND PASSING RESULT AS A PROP TO STANDINGS

const dataToMap = apiData;
const handicapData = handicaps;
let testApiData: any;

const requestHeaders = {
        headers: {
                'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a'
        }
}

const apiCall: any = async () => {
        const response = await fetch('http://api.football-data.org/v2/competitions/2016/standings', requestHeaders);
        const json = await response.json();
        testApiData = json;
        console.log(testApiData, 'from inside the apiCall')
        return testApiData
}

// const realApiData: any = async () => await apiCall();

let standingsArray: Array<RowData> = [];

const getStandingsArray = () => {
        for ( let i = 0; i < 2; i++ ) {
                // const currentTeamId = dataToMap.standings[0].table[i].team.id;
                // let currentTeamHandicapObject = handicapData.find(item => item.id === currentTeamId);
                // let currentTeamHandicap = currentTeamHandicapObject!.handicaps[0].value; 
                // let currentTeamHppg = currentTeamHandicapObject!.handicaps[0].hppg; 
                // let currentTeamGamesPlayed = dataToMap.standings[0].table[i].playedGames;
                // let currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg!;
                // let currentTeamTotal = dataToMap.standings[0].table[i].points + currentTeamCurrentHcap;

                // const teamObject: RowData = {
                // "crest": dataToMap.standings[0].table[i].team.crestUrl,
                // "position": dataToMap.standings[0].table[i].position,
                // "team": dataToMap.standings[0].table[i].team.name,
                // "played": dataToMap.standings[0].table[i].playedGames,
                // "won": dataToMap.standings[0].table[i].won,
                // "drawn": dataToMap.standings[0].table[i].draw,
                // "lost": dataToMap.standings[0].table[i].lost,
                // "scored": dataToMap.standings[0].table[i].goalsFor,
                // "conceded": dataToMap.standings[0].table[i].goalsAgainst,
                // "difference": dataToMap.standings[0].table[i].goalDifference,
                // "points": dataToMap.standings[0].table[i].points,
                // "handicap": currentTeamHandicap,
                // "hppg": currentTeamHppg,
                // "total": currentTeamTotal.toFixed(2)
                console.log(testApiData, 'inside the for loop');
                let currentTeamId = apiCall.standings[0].table[i].team.id;
                let currentTeamHandicapObject = handicapData.find(item => item.id === currentTeamId);
                let currentTeamHandicap = currentTeamHandicapObject!.handicaps[0].value; 
                let currentTeamHppg = currentTeamHandicapObject!.handicaps[0].hppg; 
                let currentTeamGamesPlayed = apiCall.standings[0].table[i].playedGames;
                let currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg!;
                let currentTeamTotal = apiCall.standings[0].table[i].points + currentTeamCurrentHcap;

                const teamObject: RowData = {
                "crest": apiCall.standings[0].table[i].team.crestUrl,
                "position": apiCall.standings[0].table[i].position,
                "team": apiCall.standings[0].table[i].team.name,
                "played": apiCall.standings[0].table[i].playedGames,
                "won": apiCall.standings[0].table[i].won,
                "drawn": apiCall.standings[0].table[i].draw,
                "lost": apiCall.standings[0].table[i].lost,
                "scored": apiCall.standings[0].table[i].goalsFor,
                "conceded": apiCall.standings[0].table[i].goalsAgainst,
                "difference": apiCall.standings[0].table[i].goalDifference,
                "points": apiCall.standings[0].table[i].points,
                "handicap": currentTeamHandicap,
                "hppg": currentTeamHppg,
                "total": currentTeamTotal.toFixed(2)
        }
        standingsArray.push(teamObject);
        }
        return;
}

apiCall();

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
