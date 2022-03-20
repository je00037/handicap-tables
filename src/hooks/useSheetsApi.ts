import { useState, useEffect } from 'react';
// import handicaps from '../handicaps.json';

export const useSheetsApi = (leagueID: number): object => {
  const [data, setData] = useState();
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

  const tabString = getTabName(leagueID);
  const sheetID = '1mngknAhWe5KJYhSZSTSVAXMOU5OfBTmPK1W2UBicMTI';
  const apiKey = 'AIzaSyB9mpWO03Q5TQpoFd4OzKf0KkA_VGJuQNo';
  const endpoint =
    leagueID === 1
      ? `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:F21?key=${apiKey}&majorDimension=COLUMNS`
      : `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/'${tabString}'!A1:F25?key=${apiKey}&majorDimension=COLUMNS`;

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

  // const transformData = (data) => {
  //   let handicapData = handicaps;
  //   data.forEach((item, index) => {
  //     if (index === 0) {
  //       item.forEach((item) => {
  //         if (item = "Team") {
  //           return
  //         }
  //         handicapData.bookmaker.
  //       })
  //     }
  //   })
  //   const object = {
  //     "bookmaker": {
  //       "Sky Bet": {
  //         "Premier League": [
  //           {
  //             "id": ,
  //             "team": ,
  //             "hcap": ,
  //             "hppg":
  //           }
  //         ]
  //       }
  //     }
  //   }
  //   return object;
  // };

  useEffect(() => {
    getData(endpoint);
  }, []);

  return {
    data,
    loading,
    error,
  };
};
