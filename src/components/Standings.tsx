import React, { FC } from 'react';
import {
  HandicapData,
  HandicapTeamObject,
  RowData,
  Bookies,
  ApiDataResponse,
} from '../interfaces';
import handicaps from '../handicaps.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import LoadingDots from './LoadingDots';
import { supportedLeagues } from '.././constants';
interface StandingsProps {
  bookie: Bookies;
  league: string | number;
  data: ApiDataResponse;
  loading: boolean;
}

const handicapData: HandicapData = handicaps;

let standingsArray: Array<RowData> = [];

const Standings: FC<StandingsProps> = ({ bookie, league, data, loading }) => {
  const getLeagueString = (league: number | string) => {
    return supportedLeagues.find((obj) => obj.apiId === league)?.name;
  };

  const getStandingsArray = (
    leagueData: ApiDataResponse,
    bookie: any,
    league: any
  ) => {
    if (leagueData === null) {
      console.log('error, leagueData has been passed as null');
      return;
    }
    standingsArray = [];
    const leagueStr = getLeagueString(league);
    const leagueCount = league === 39 ? 20 : 24;

    for (let i = 0; i < leagueCount; i++) {
      const currentTeamId = leagueData[0].league.standings[0][i].team.id;
      const currentTeamHandicapObject = handicapData.bookmaker[
        bookie as string
      ][leagueStr as string].find(
        (item: any) => item.id === currentTeamId
      ) as HandicapTeamObject;
      const currentTeamHandicap = currentTeamHandicapObject.hcap;
      const currentTeamHppg = currentTeamHandicapObject.ppg;
      const currentTeamGamesPlayed =
        leagueData[0].league.standings[0][i].all.played;
      const currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg;
      let currentTeamTotal =
        leagueData[0].league.standings[0][i].points + currentTeamCurrentHcap;
      currentTeamTotal = Math.round(currentTeamTotal * 1e2) / 1e2; // round to two decimal places

      const teamObject: RowData = {
        league: league,
        bookie: bookie,
        crest: leagueData[0].league.standings[0][i].team.logo,
        position: leagueData[0].league.standings[0][i].rank,
        team: currentTeamHandicapObject.team,
        played: leagueData[0].league.standings[0][i].all.played,
        won: leagueData[0].league.standings[0][i].all.win,
        drawn: leagueData[0].league.standings[0][i].all.draw,
        lost: leagueData[0].league.standings[0][i].all.lose,
        scored: leagueData[0].league.standings[0][i].all.goals.for,
        conceded: leagueData[0].league.standings[0][i].all.goals.against,
        difference: leagueData[0].league.standings[0][i].goalsDiff,
        points: leagueData[0].league.standings[0][i].points,
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

  const checkReady = (league: any, data: ApiDataResponse) => {
    if (data === null) {
      console.log('not ready, data is null');
      return;
    }
    if (league === data[0].league.id) {
      return true;
    } else return false;
  };

  const isReady = checkReady(league, data);

  if (isReady === true) {
    getStandingsArray(data, bookie, league);
  }

  return loading ? (
    <LoadingDots />
  ) : (
    <>
      <table className="table-auto w-6/12 text-center text-green-50">
        <thead>
          <HeadingsRow league={league} />
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
