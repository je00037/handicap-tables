import React, { FC, useState } from 'react';
import { useFetch } from './utils/useFetch';
import { Bookies, Leagues } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import LoadingDots from './components/LoadingDots';

// let dataPlaceholder: ApiData;

// const league1Handler = () => {
//   const league1Endpoint = 'https://v3.football.api-sports.io/standings?league=41&season=2021';
//   const requestHeaders = {
//     headers: {
//       'x-apisports-key': '1ee142cfc34ceae31ba7758c4bd972f4',
//     },
//   };
//   const { response, error, loading } = useFetch(league1Endpoint, requestHeaders);

// }

const endpointBuilder = (league: string) => {
  let apiId;
  switch (league) {
    case 'PremierLeague':
      apiId = 39;
      break;
    case 'Championship':
      apiId = 40;
      break;
    case 'League 1':
      apiId = 41;
      break;
    case 'League 2':
      apiId = 42;
      break;
    default:
      console.log('invalid league string provided');
  }

  const endpoint = `https://v3.football.api-sports.io/standings?league=${apiId}&season=2021`;
  return endpoint;
};

const App: FC = () => {
  // const [apiData, setApiData] = useState<ApiData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [currentBookie, setCurrentBookie] = useState<Bookies>('SkyBet');
  const [currentLeague, setCurrentLeague] = useState<Leagues>(null);
  // const apiCall = async (url: string, options: object) => {
  //   const res = await fetch(url, options);
  //   dataPlaceholder = await res.json();
  //   setApiData(dataPlaceholder);
  //   setIsLoading(false);
  // };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
  };
  const clickHandlerLeague = (newLeague: Leagues) => {
    setCurrentLeague(newLeague);
  };

  // useEffect(() => {
  //   if (isLoading === true) {
  //     setTimeout(() => apiCall(champEndpoint, requestHeaders), 3000);
  //   }
  // }, []);

  return currentLeague ? (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header />
      <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
      <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      <Standings bookie={currentBookie} league={currentLeague} />
      <Footer />
    </div>
  ) : (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header />
      <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
      <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      <p>Click a league to get started!</p>
      <Footer />
    </div>
  );
};

export default App;
