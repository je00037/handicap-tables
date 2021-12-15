import React, { FC, useState, useEffect } from 'react';
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
import { supportedLeagues } from '.././constants';

interface StandingsProps {
  bookie: Bookies;
  league: string | number;
  data: any;
  loading: boolean;
}

const handicapData: HandicapData = handicaps;

let standingsArray: Array<RowData> = [];

const Standings: FC<StandingsProps> = ({ bookie, league, data, loading }) => {
  // HAVE WE GOT THE LEAGUE'S DATA IN THE CACHE ALREADY?

  // const leagueData: any = cache.find(
  //   (item: any) => item.response[0].league.id === league
  // );

  // console.log(leagueData);

  // IF !leagueData, GO GET THE DATA

  // const asyncDataFetch = async () => {
  //   const data = await getData(league);
  //   console.log(data);
  // };
  // ADD THE NEW DATA TO THE CACHE
  // setCache((cache: <Array<Record<any, any>>>) => [...cache, data]);

  // CALL THE FUNCTION IF !leagueData. WILL GET DATA, SET CACHE, RE-RENDER, THIS TIME DATA WILL BE IN CACHE AND leagueData WILL BE INITIALISED
  // asyncDataFetch();

  // PASS leagueData TO STANDINGS

  const getStandingsArray = (leagueData: any) => {
    standingsArray = [];

    const getLeagueString = (league: number | string) => {
      return supportedLeagues.find((obj) => obj.apiId === league)?.name;
    };

    const leagueStr = getLeagueString(league);
    const leagueCount = league === 39 ? 20 : 24;

    for (let i = 0; i < leagueCount; i++) {
      const currentTeamId =
        leagueData.response[0].league.standings[0][i].team.id;
      const currentTeamHandicapObject = handicapData.bookmaker[
        bookie as string
      ][leagueStr as string].find(
        (item: any) => item.id === currentTeamId
      ) as HandicapTeamObject;
      const currentTeamHandicap = currentTeamHandicapObject.hcap;
      const currentTeamHppg = currentTeamHandicapObject.ppg;
      const currentTeamGamesPlayed =
        leagueData.response[0].league.standings[0][i].all.played;
      const currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg;
      let currentTeamTotal =
        leagueData.response[0].league.standings[0][i].points +
        currentTeamCurrentHcap;
      currentTeamTotal = Math.round(currentTeamTotal * 1e2) / 1e2; // round to two decimal places

      const teamObject: RowData = {
        crest: leagueData.response[0].league.standings[0][i].team.logo,
        position: leagueData.response[0].league.standings[0][i].rank,
        team: currentTeamHandicapObject.team,
        played: leagueData.response[0].league.standings[0][i].all.played,
        won: leagueData.response[0].league.standings[0][i].all.win,
        drawn: leagueData.response[0].league.standings[0][i].all.draw,
        lost: leagueData.response[0].league.standings[0][i].all.lose,
        scored: leagueData.response[0].league.standings[0][i].all.goals.for,
        conceded:
          leagueData.response[0].league.standings[0][i].all.goals.against,
        difference: leagueData.response[0].league.standings[0][i].goalsDiff,
        points: leagueData.response[0].league.standings[0][i].points,
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

  getStandingsArray(data);
  // if (lazydata !== undefined) getStandingsArray(lazydata);
  // NEED TO WAIT TIL NEW DATA IS GOT BEFORE CALLING THIS

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
