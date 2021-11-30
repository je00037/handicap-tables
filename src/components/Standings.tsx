import React, { FC } from 'react';
import {
  ApiData,
  HandicapData,
  HandicapTeamObject,
  RowData,
} from '../interfaces';
import handicaps from '../handicaps-2.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import { useFetch } from '../utils/useFetch';
import LoadingDots from './LoadingDots';
interface StandingsProps {
  bookie: string;
  league: string;
}

const handicapData: HandicapData = handicaps;

let standingsArray: Array<RowData> = [];

const Standings: FC<StandingsProps> = ({
  bookie = 'SkyBet',
  league = 'Championship',
}) => {
  // have the league passed in from clickhandler on league picker
  // have state variable for data for each league
  // when league prop is passed in to standings, check whether we have data for that league
  // if no data for that league, go get it using usefetch and set it into that state variable
  // if data exists for that league in that state variable, just use it

  const requestHeaders = {
    headers: {
      'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a',
    },
  };
  const champEndpoint =
    'http://api.football-data.org/v2/competitions/2016/standings';
  const { data, error, loading } = useFetch(champEndpoint, requestHeaders);

  if (error) console.log(error);

  const getStandingsArray = (data: ApiData) => {
    standingsArray = [];
    for (let i = 0; i < 24; i++) {
      const currentTeamId: number = data.standings[0].table[i].team.id;
      const currentTeamHandicapObject: HandicapTeamObject | undefined =
        handicapData.bookmaker[bookie][league].find(
          (item) => item.id === currentTeamId
        );
      const currentTeamHandicap = currentTeamHandicapObject!.hcap;
      const currentTeamHppg = currentTeamHandicapObject!.ppg;
      const currentTeamGamesPlayed = data.standings[0].table[i].playedGames;
      const currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg;
      let currentTeamTotal =
        data.standings[0].table[i].points + currentTeamCurrentHcap;
      currentTeamTotal = Math.round(currentTeamTotal * 1e2) / 1e2; // round to two decimal places

      const teamObject: RowData = {
        crest: data.standings[0].table[i].team.crestUrl,
        position: data.standings[0].table[i].position,
        team: currentTeamHandicapObject!.team,
        played: data.standings[0].table[i].playedGames,
        won: data.standings[0].table[i].won,
        drawn: data.standings[0].table[i].draw,
        lost: data.standings[0].table[i].lost,
        scored: data.standings[0].table[i].goalsFor,
        conceded: data.standings[0].table[i].goalsAgainst,
        difference: data.standings[0].table[i].goalDifference,
        points: data.standings[0].table[i].points,
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
    return standingsArray;
  };

  if (data) getStandingsArray(data);

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
