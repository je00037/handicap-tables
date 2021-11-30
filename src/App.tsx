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

const requestHeaders = {
  headers: {
    'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a',
  },
};

const champEndpoint =
  'http://api.football-data.org/v2/competitions/2016/standings';

const App: FC = () => {
  // const [apiData, setApiData] = useState<ApiData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [currentBookie, setCurrentBookie] = useState<Bookies>('SkyBet');
  const [currentLeague, setCurrentLeague] = useState<Leagues>('Championship');
  // const apiCall = async (url: string, options: object) => {
  //   const res = await fetch(url, options);
  //   dataPlaceholder = await res.json();
  //   setApiData(dataPlaceholder);
  //   setIsLoading(false);
  // };
  const { response, error, loading } = useFetch(champEndpoint, requestHeaders);

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
  if (error) console.log(error);
  return loading ? (
    <LoadingDots />
  ) : (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header />
      <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
      <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      <Standings
        data={response}
        bookie={currentBookie}
        league={currentLeague}
      />
      <Footer />
    </div>
  );
};

export default App;
