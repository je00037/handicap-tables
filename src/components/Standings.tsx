import React, { FC, useState } from 'react';
import {
  ApiData,
  HandicapData,
  HandicapTeamObject,
  RowData,
  Leagues,
  Bookies,
} from '../interfaces';
import handicaps from '../handicaps-2.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { useFetch } from '../utils/useFetch';
import LoadingDots from './LoadingDots';
import { useLazyFetch } from '../utils/useLazyFetch';
import newData from '../new-api-response.json';
import { supportedLeagues } from '.././constants';
interface StandingsProps {
  bookie: string;
  league: string | number;
}

const newApiData = newData;

const handicapData: HandicapData = handicaps;

let standingsArray: Array<RowData> = [];

// new api and hcap data notation
// for (let i = 0; i < 24; i++) {
//   const newDataTeamId: number =
//     newData.response[0].league.standings[0][i].team.id;
//   const newDataCurrentTeamGamesPlayed =
//     newData.response[0].league.standings[0][i].all.played;
//   console.log(newDataTeamId, newDataCurrentTeamGamesPlayed);
// }

const Standings: FC<StandingsProps> = ({ bookie, league }) => {
  // have the league passed in from app, based on clickhandler on league picker
  // have state variable for data for each league
  // when league prop is passed in to standings, check whether we have data for that league
  // if no data for that league, go get it using usefetch and set it into that state variable
  // if data exists for that league in that state variable, just use it

  // const { premData, setPremData } = useState(null);
  // const { champData, setChampData } = useState(null);
  // const { leagueOneData, setLeagueOneData } = useState(null);
  // const { leagueTwoData, setLeagueTwoData } = useState(null);

  // if (league === 'PremierLeague' && !premData) {
  //   const { data, error, loading } = useFetch( ... );
  //   setPremData(data);
  // }

  const requestHeaders = {
    headers: {
      'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a',
    },
  };
  const champEndpoint =
    'http://api.football-data.org/v2/competitions/2016/standings';

  const { data, error, loading } = useFetch(champEndpoint, requestHeaders);

  if (error) console.log(error);

  const getStandingsArray = (newApiData: any) => {
    standingsArray = [];
    const getLeagueString = (league: number | string) => {
      return supportedLeagues.find((obj) => obj.id === league)?.name;
    };
    const leagueStr = getLeagueString(league);
    for (let i = 0; i < 24; i++) {
      // old team ID: const currentTeamId: number = data.standings[0].table[i].team.id;
      const currentTeamId =
        newApiData.response[0].league.standings[0][i].team.id;
      const currentTeamHandicapObject = handicapData.bookmaker[bookie][
        leagueStr as string
      ].find((item: any) => item.id === currentTeamId) as HandicapTeamObject;
      console.log(currentTeamHandicapObject);
      const currentTeamHandicap = currentTeamHandicapObject.hcap;
      const currentTeamHppg = currentTeamHandicapObject.ppg;
      // old team games played: const currentTeamGamesPlayed = data.standings[0].table[i].playedGames;
      const currentTeamGamesPlayed =
        newApiData.response[0].league.standings[0][i].all.played;
      const currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg;
      let currentTeamTotal =
        newApiData.response[0].league.standings[0][i].points +
        currentTeamCurrentHcap;
      currentTeamTotal = Math.round(currentTeamTotal * 1e2) / 1e2; // round to two decimal places

      // original team object
      // const teamObject: RowData = {
      //   crest: data.standings[0].table[i].team.crestUrl,
      //   position: data.standings[0].table[i].position,
      //   team: currentTeamHandicapObject.team,
      //   played: data.standings[0].table[i].playedGames,
      //   won: data.standings[0].table[i].won,
      //   drawn: data.standings[0].table[i].draw,
      //   lost: data.standings[0].table[i].lost,
      //   scored: data.standings[0].table[i].goalsFor,
      //   conceded: data.standings[0].table[i].goalsAgainst,
      //   difference: data.standings[0].table[i].goalDifference,
      //   points: data.standings[0].table[i].points,
      //   handicap: currentTeamHandicap,
      //   hppg: currentTeamHppg,
      //   total: currentTeamTotal,
      // };

      // new api team object
      const teamObject: RowData = {
        crest: newApiData.response[0].league.standings[0][i].team.logo,
        // newData.response[0].league.standings[0][i].team.logo
        position: newApiData.response[0].league.standings[0][i].rank,
        // newData.response[0].league.standings[0][i].rank
        team: currentTeamHandicapObject.team,
        played: newApiData.response[0].league.standings[0][i].all.played,
        // newData.response[0].league.standings[0][i].all.played
        won: newApiData.response[0].league.standings[0][i].all.win,
        // newData.response[0].league.standings[0][i].all.win
        drawn: newApiData.response[0].league.standings[0][i].all.draw,
        // newData.response[0].league.standings[0][i].all.draw
        lost: newApiData.response[0].league.standings[0][i].all.lose,
        // newData.response[0].league.standings[0][i].all.lose
        scored: newApiData.response[0].league.standings[0][i].all.goals.for,
        // newData.response[0].league.standings[0][i].all.goals.for
        conceded:
          newApiData.response[0].league.standings[0][i].all.goals.against,
        // newData.response[0].league.standings[0][i].all.goals.against
        difference: newApiData.response[0].league.standings[0][i].goalsDiff,
        // newData.response[0].league.standings[0][i].goalsDiff
        points: newApiData.response[0].league.standings[0][i].points,
        // newData.response[0].league.standings[0][i].points
        handicap: currentTeamHandicap,
        hppg: currentTeamHppg,
        total: currentTeamTotal,
      };
      standingsArray.push(teamObject);
    }
    // sort the array here based on total (points + hcap)
    standingsArray.sort((a, b) => {
      return b.total - a.total;
    });
    // will need to set the state for each league's data at this point?
    return standingsArray;
  };

  if (newApiData) getStandingsArray(newApiData);

  // switch (league) {
  //   case 'PremierLeague':
  //     if (premData) break;
  //     getStandingsArray(premData);
  //     break;
  //   case 'Championship':
  //     getStandingsArray(champData);
  //     break;
  //   case 'LeagueOne':
  //     getStandingsArray(leagueOneData);
  //     break;
  //   case 'LeagueTwo':
  //     getStandingsArray(leagueTwoData);
  //     break;
  //   default:
  //     console.log('invalid league name');
  // }

  // how to use the correct league's data in the map below?

  return loading ? (
    <LoadingDots />
  ) : (
    <>
      <table className="table-auto w-6/12 text-center text-green-50">
        <thead>
          <HeadingsRow />
        </thead>
        <tbody>
          {standingsArray.map((item, index) => {
            const hcapPos = index + 1;
            return <Row rowData={item} key={index} hcapPos={hcapPos} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default Standings;
