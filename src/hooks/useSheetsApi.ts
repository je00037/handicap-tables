import { useState, useEffect } from 'react';

type SheetsDimension = 'ROWS' | 'COLUMNS';

type SheetsReturn = {
  handicaps: Record<string, unknown> | undefined;
  loading: boolean;
  error: unknown;
};

export const useSheetsApi = (
  leagueID: number,
  dimension: SheetsDimension
): SheetsReturn => {
  const [data, setData] = useState();
  const [handicaps, setHandicaps] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getTabName = (id: number) => {
    switch (id) {
      case 1:
        return 'Premier League handicaps';
        break;
      case 2:
        return 'Championship handicaps';
        break;
      case 3:
        return 'League One handicaps';
        break;
      case 4:
        return 'League Two handicaps';
        break;
      default:
        return 'invalid league ID provided';
    }
  };

  const getLeagueName = (id: number) => {
    switch (id) {
      case 1:
        return 'Premier League';
        break;
      case 2:
        return 'Championship';
        break;
      case 3:
        return 'League One';
        break;
      case 4:
        return 'League Two';
        break;
      default:
        return 'invalid league ID provided';
    }
  };

  const tabString = getTabName(leagueID);
  const sheetID = '1mngknAhWe5KJYhSZSTSVAXMOU5OfBTmPK1W2UBicMTI';
  const apiKey = 'AIzaSyB9mpWO03Q5TQpoFd4OzKf0KkA_VGJuQNo';
  const endpoint =
    leagueID === 1
      ? `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:G21?key=${apiKey}&majorDimension=${dimension}`
      : `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:G25?key=${apiKey}&majorDimension=${dimension}`;

  const getData = async (endpoint: string) => {
    setLoading(true);
    window.gtag('event', 'Data Request', {
      event_category: 'Sheets API Call',
    });
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

  const transformData = (data: any) => {
    if (data === undefined) return;
    const newHandicaps: any = {
      bookmaker: {
        'Sky Bet': {
          [leagueName]: [],
        },
        Ladbrokes: {
          [leagueName]: [],
        },
        PPBF: {
          [leagueName]: [],
        },
        Hills: {
          [leagueName]: [],
        },
        'Bet 365': {
          [leagueName]: [],
        },
      },
    };
    data.forEach((item: any, index: number) => {
      if (index === 0) return;
      const ppgSky = item[2] / 46;
      const ppgLads = item[3] / 46;
      const ppgPpbf = item[4] / 46;
      const ppgHills = item[5] / 46;
      const ppgBet365 = item[6] / 46;

      const teamSky = {
        id: item[1],
        team: item[0],
        hcap: item[2],
        ppg: Math.round(ppgSky * 1e2) / 1e2,
      };
      const teamLads = {
        id: item[1],
        team: item[0],
        hcap: item[3],
        ppg: Math.round(ppgLads * 1e2) / 1e2,
      };
      const teamPpbf = {
        id: item[1],
        team: item[0],
        hcap: item[4],
        ppg: Math.round(ppgPpbf * 1e2) / 1e2,
      };
      const teamHills = {
        id: item[1],
        team: item[0],
        hcap: item[5],
        ppg: Math.round(ppgHills * 1e2) / 1e2,
      };
      const teamBet365 = {
        id: item[1],
        team: item[0],
        hcap: item[6],
        ppg: Math.round(ppgBet365 * 1e2) / 1e2,
      };
      newHandicaps.bookmaker['Sky Bet'][leagueName].push(teamSky);
      newHandicaps.bookmaker['Ladbrokes'][leagueName].push(teamLads);
      newHandicaps.bookmaker['PPBF'][leagueName].push(teamPpbf);
      newHandicaps.bookmaker['Hills'][leagueName].push(teamHills);
      newHandicaps.bookmaker['Bet 365'][leagueName].push(teamBet365);
    });
    setHandicaps(newHandicaps);
  };

  useEffect(() => {
    getData(endpoint);
  }, []);

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
