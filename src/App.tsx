import React, { FC, useState, useEffect } from 'react';
import { Bookies } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import { useLazyFetch } from './utils/useLazyFetch';
import premData from './new-api-response-prem.json';
import leagueTwoData from './new-api-response-league2.json';
import { useDarkMode } from './utils/useDarkMode';
import { DarkSwitch } from './components/DarkSwitch';

const someData = [premData, leagueTwoData];

const App: FC = () => {
  console.log('app rendered');
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [cache, setCache] = useState<any>(someData);
  const [currentData, setCurrentData] = useState<any>();

  console.log('app', currentLeague);
  console.log('app', currentData);

  const { getData, loading, error } = useLazyFetch(cache, setCache);
  const [nextValue, setIsEnabled] = useDarkMode();

  // console.log('currentLeague', currentLeague);
  // console.log('cache', cache);
  // console.log('currentData', currentData);
  // console.log('loading', loading);

  // useEffect(() => {
  //   console.log('app', cache);
  //   const cacheItem = cache.find
  //     (item: any) => item.response[0].league.id === currentLeague
  //   );
  //   // console.log('useeffect cache item', cacheItem);
  //   if (cacheItem) setCurrentData(cacheItem);
  // }, [currentLeague]);

  // const testFetch = async (newLeague: number) => {
  //   await getData(newLeague);
  // };

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
  };

  const isItemInCache = (newLeague: number) => {
    const item = cache.find(
      (item: any) => item.response[0].league.id === newLeague
    );
    return !item ? false : true;
  };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
  };
  const clickHandlerLeague = async (newLeague: number) => {
    if (isItemInCache(newLeague) === false) {
      await getData(newLeague);
      const item = cache.find(
        (item: any) => item.response[0].league.id === newLeague
      );
      setCurrentLeague(newLeague);
      setCurrentData(item); // NEED TO TEST THIS PART WHEN RATE LIMIT LIFTED
    } else {
      const item = cache.find(
        (item: any) => item.response[0].league.id === newLeague
      );
      setCurrentLeague(newLeague);
      setCurrentData(item);
    }

    // THE ABOVE SHOULD BE WORKING WHEN RATE LIMIT IS LIFTED, WORKING WHEN SWITCHING BETWEEN INITIALLY CACHED LEAGUES.
    // NEED TO ENSURE THAT THE SAME LOGIC APPLIES WHEN WE DONT HAVE THE DATA AND NEED THE API.

    // IN THE FIND, THE CACHE IS WHAT IT WAS WHEN CACHE WAS SET ON INITIAL RENDER.
    // THE CLICK HANDLER WHEN CREATED REFERS TO ORIGINAL VALUE OF CACHE.
    // WHEN CLICK HANDLER COMPLETES AFTER THE FETCH, IT COMPLETES AGAINST ORIGINAL CACHE VALUE!
  };

  return (
    <div
      className={
        (!currentLeague && !currentBookie) || (currentLeague && !currentBookie)
          ? 'h-screen flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800'
          : 'flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800'
      }
    >
      <div className="flex flex-col justify-center items-center">
        <DarkSwitch handleClick={clickHandlerDark} nextValue={nextValue} />
        <Header />
        <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
        <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      </div>
      {currentLeague && currentBookie ? (
        <Standings
          bookie={currentBookie}
          league={currentLeague}
          data={currentData}
          loading={loading}
        />
      ) : (
        <p className="text-center text-2xl pb-10 text-blue-900 dark:text-white">
          Select a league and a bookie to get started!
        </p>
      )}
      <Footer />
    </div>
  );
};

export default App;
