import { useState, useEffect } from 'react';
import { HandicapData } from '../interfaces';
import { fireAnalytics } from '../utils/fireAnalytics';

type SheetsDimension = 'ROWS' | 'COLUMNS';

type SheetsReturn = {
  handicaps: HandicapData | undefined;
  loading: boolean;
  error: unknown;
};

type SheetsArray = Array<SheetsItemArray>;

type SheetsItemArray = Array<string | number>;

export const useSheetsApi = (
  leagueID: number | undefined,
  seasonID: number | undefined,
  dimension: SheetsDimension
): SheetsReturn => {
  const [data, setData] = useState<SheetsArray | undefined>();
  const [handicaps, setHandicaps] = useState<HandicapData | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getTabName = (
    leagueID: number | undefined,
    seasonID: number | undefined
  ) => {
    const variables = {
      league: leagueID,
      season: seasonID,
    };

    switch (true) {
      case variables.league === 39 && variables.season === 2021:
        return 'Premier League handicaps';
        break;
      case variables.league === 40 && variables.season === 2021:
        return 'Championship handicaps';
        break;
      case variables.league === 41 && variables.season === 2021:
        return 'League One handicaps';
        break;
      case variables.league === 42 && variables.season === 2021:
        return 'League Two handicaps';
        break;
      case variables.league === 39 && variables.season === 2022:
        return '2223 Prem';
        break;
      case variables.league === 40 && variables.season === 2022:
        return '2223 Champ';
        break;
      case variables.league === 41 && variables.season === 2022:
        return '2223 League 1';
        break;
      case variables.league === 42 && variables.season === 2022:
        return '2223 League 2';
        break;
      default:
        return 'invalid league ID provided';
    }
  };
  const getLeagueName = (id: number | undefined) => {
    switch (id) {
      case 39:
        return 'Premier League';
        break;
      case 40:
        return 'Championship';
        break;
      case 41:
        return 'League One';
        break;
      case 42:
        return 'League Two';
        break;
      default:
        return 'invalid league ID provided';
    }
  };

  const tabString = getTabName(leagueID, seasonID);
  const sheetID = '1mngknAhWe5KJYhSZSTSVAXMOU5OfBTmPK1W2UBicMTI';
  const apiKey = 'AIzaSyB9mpWO03Q5TQpoFd4OzKf0KkA_VGJuQNo';
  const endpoint =
    leagueID === 39
      ? `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:I21?key=${apiKey}&majorDimension=${dimension}`
      : `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:I25?key=${apiKey}&majorDimension=${dimension}`;

  const getData = async (endpoint: string) => {
    if (leagueID === undefined) return;
    setLoading(true);
    fireAnalytics('Sheets API Call', 'null', 'Data Request');
    try {
      const result = await fetch(endpoint);
      const json = await result.json();
      const response = json.values;
      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const leagueName = getLeagueName(leagueID);

  const transformData = (data: SheetsArray | undefined) => {
    if (data === undefined) return;
    const newHandicaps: HandicapData = {
      season: parseInt(data[1][8] as string),
      leagueID: parseInt(data[1][0] as string),
      bookmaker: {
        'Sky Bet': {
          [leagueName]: [],
        },
        'Lads Coral': {
          [leagueName]: [],
        },
        PPBF: {
          [leagueName]: [],
        },
        Hills: {
          [leagueName]: [],
        },
        bet365: {
          [leagueName]: [],
        },
      },
    };
    data.forEach((item: SheetsItemArray, index: number) => {
      if (index === 0) return;
      const ppgSky =
        leagueID !== 39 ? (item[3] as number) / 46 : (item[3] as number) / 38;
      const ppgLads =
        leagueID !== 39 ? (item[4] as number) / 46 : (item[4] as number) / 38;
      const ppgPpbf =
        leagueID !== 39 ? (item[5] as number) / 46 : (item[5] as number) / 38;
      const ppgHills =
        leagueID !== 39 ? (item[6] as number) / 46 : (item[6] as number) / 38;
      const ppgBet365 =
        leagueID !== 39 ? (item[7] as number) / 46 : (item[7] as number) / 38;

      const teamSky = {
        id: item[2],
        team: item[1],
        hcap: item[3],
        ppg: Math.round(ppgSky * 1e2) / 1e2,
      };
      const teamLads = {
        id: item[2],
        team: item[1],
        hcap: item[4],
        ppg: Math.round(ppgLads * 1e2) / 1e2,
      };
      const teamPpbf = {
        id: item[2],
        team: item[1],
        hcap: item[5],
        ppg: Math.round(ppgPpbf * 1e2) / 1e2,
      };
      const teamHills = {
        id: item[2],
        team: item[1],
        hcap: item[6],
        ppg: Math.round(ppgHills * 1e2) / 1e2,
      };
      const teamBet365 = {
        id: item[2],
        team: item[1],
        hcap: item[7],
        ppg: Math.round(ppgBet365 * 1e2) / 1e2,
      };
      newHandicaps.bookmaker['Sky Bet'][leagueName].push(teamSky);
      newHandicaps.bookmaker['Lads Coral'][leagueName].push(teamLads);
      newHandicaps.bookmaker['PPBF'][leagueName].push(teamPpbf);
      newHandicaps.bookmaker['Hills'][leagueName].push(teamHills);
      newHandicaps.bookmaker['bet365'][leagueName].push(teamBet365);
    });
    setHandicaps(newHandicaps);
  };

  useEffect(() => {
    if (leagueID === undefined) return;
    getData(endpoint);
  }, [leagueID, seasonID]); // MAYBE NEED TO ADD SEASON INTO HERE TOO

  useEffect(() => {
    if (data === undefined) return;
    transformData(data);
  }, [data]);

  return {
    handicaps,
    loading,
    error,
  };
};
