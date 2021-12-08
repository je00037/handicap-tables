import {
  ApiData,
  HandicapTeamObject,
  RowData,
  Bookies,
  Leagues,
} from '../interfaces';
import handicapData from '../handicaps-2.json';

export const getStandingsArray = (
  data: ApiData,
  bookie: Bookies,
  league: Leagues
) => {
  if (league === null) {
    console.log('error, league was passed as null');
    return;
  }
  // const standingsArray: Array<RowData> = [];
  // for (let i = 0; i < 24; i++) {
  //   const currentTeamId: number = data.standings[0].table[i].team.id;
  //   const currentTeamHandicapObject: HandicapTeamObject | undefined =
  //     handicapData.bookmaker[bookie][league].find(
  //       (item: HandicapTeamObject) => item.id === currentTeamId
  //     );
  //   const currentTeamHandicap = currentTeamHandicapObject!.hcap;
  //   const currentTeamHppg = currentTeamHandicapObject!.ppg;
  //   const currentTeamGamesPlayed = data.standings[0].table[i].playedGames;
  //   const currentTeamCurrentHcap = currentTeamGamesPlayed * currentTeamHppg;
  //   let currentTeamTotal =
  //     data.standings[0].table[i].points + currentTeamCurrentHcap;
  //   currentTeamTotal = Math.round(currentTeamTotal * 1e2) / 1e2; // round to two decimal places

  //   const teamObject: RowData = {
  //     crest: data.standings[0].table[i].team.crestUrl,
  //     position: data.standings[0].table[i].position,
  //     team: currentTeamHandicapObject!.team,
  //     played: data.standings[0].table[i].playedGames,
  //     won: data.standings[0].table[i].won,
  //     drawn: data.standings[0].table[i].draw,
  //     lost: data.standings[0].table[i].lost,
  //     scored: data.standings[0].table[i].goalsFor,
  //     conceded: data.standings[0].table[i].goalsAgainst,
  //     difference: data.standings[0].table[i].goalDifference,
  //     points: data.standings[0].table[i].points,
  //     handicap: currentTeamHandicap,
  //     hppg: currentTeamHppg,
  //     total: currentTeamTotal,
  //   };
  //   standingsArray.push(teamObject);
  // }
  // // sort the array here based on total (points + hcap)
  // standingsArray.sort((a, b) => {
  //   return b.total - a.total;
  // });
  // return standingsArray;
};
