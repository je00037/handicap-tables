import React, { FC, useState, useEffect } from 'react';
import { ApiData } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import LoadingDots from './components/LoadingDots';

const App: FC = () => {
  let dataPlaceholder: ApiData;

  const requestHeaders = {
    headers: {
      'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a',
    },
  };

  const champEndpoint =
    'http://api.football-data.org/v2/competitions/2016/standings';

  const apiCall = async (url: string, options: object) => {
    const response = await fetch(url, options);
    dataPlaceholder = await response.json();
    setApiData(dataPlaceholder);
    setIsLoading(false);
  };

  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBookie, setCurrentBookie] = useState('SkyBet');
  const [currentLeague, setCurrentLeague] = useState('Championship');

  const clickHandlerBookie = (newBookie: string) => {
    setCurrentBookie(newBookie);
  };

  const clickHandlerLeague = (newLeague: string) => {
    setCurrentLeague(newLeague);
  };

  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => apiCall(champEndpoint, requestHeaders), 3000);
    }
  }, []);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header />
      <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
      <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      <Standings data={apiData} bookie={currentBookie} league={currentLeague} />
      <Footer />
    </div>
  );
};

export default App;
