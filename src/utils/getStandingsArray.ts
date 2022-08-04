import {
  HandicapTeamObject,
  RowData,
  Bookies,
  ApiDataResponse,
  HandicapData,
} from '../interfaces';
import { supportedLeagues } from '.././constants';

export const getStandingsArray = (
  leagueData: ApiDataResponse,
  bookie: Bookies,
  league: number,
  handicaps: HandicapData | undefined
): Array<RowData> | undefined => {
  console.log('leagueData', leagueData);
  console.log('bookie', bookie);
  console.log('league', league);
  console.log('handicaps', handicaps);
  if (leagueData === null) {
    console.log('error, leagueData has been passed as null');
    return;
  }
  if (handicaps === undefined) {
    console.log('error, handicap data is undefined');
    return;
  }
  const standingsArray = [];
  const getLeagueString = (league: number) => {
    return supportedLeagues.find((obj) => obj.apiId === league)?.name;
  };
  const leagueStr = getLeagueString(league);
  const leagueCount = league === 39 ? 20 : 24;

  for (let i = 0; i < leagueCount; i++) {
    const currentTeamId = leagueData[0].league.standings[0][i].team.id;
    const currentTeamHandicapObject = handicaps.bookmaker[bookie as string][
      leagueStr as string
    ].find((item: HandicapTeamObject) => {
      console.log('item id from find', parseInt(item.id as string));
      console.log('current team id from find', currentTeamId);
      return parseInt(item.id as string) === currentTeamId;
    }) as HandicapTeamObject;
    console.log('current team hcap obj', currentTeamHandicapObject);
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
