import React, { FC, useState, useEffect } from 'react';
import { useFetch } from './utils/useFetch';
import { Bookies, Leagues } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import LoadingDots from './components/LoadingDots';
import { useLazyFetch } from './utils/useLazyFetch';
import premData from './new-api-response-prem.json';
import champData from './new-api-response-champ.json';
import leagueOneData from './new-api-response-league1.json';
import leagueTwoData from './new-api-response-league2.json';

const someData = [premData, leagueTwoData];

const App: FC = () => {
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [cache, setCache] = useState<any>(someData);
  const [currentData, setCurrentData] = useState<any>();

  const { getData, loading, error } = useLazyFetch(cache, setCache);

  // console.log('currentLeague', currentLeague);
  // console.log('cache', cache);
  // console.log('currentData', currentData);
  // console.log('loading', loading);

  useEffect(() => {
    const cacheItem = cache.find(
      (item: any) => item.response[0].league.id === currentLeague
    );
    // console.log('useeffect cache item', cacheItem);
    setCurrentData(cacheItem);
  }, [currentLeague]);

  // const testFetch = async (newLeague: number) => {
  //   await getData(newLeague);
  // };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
  };
  const clickHandlerLeague = async (newLeague: number) => {
    await getData(newLeague);
    setCurrentLeague(newLeague);
    // const cacheItem = cache.find((item: any) => {
    //   return item.response[0].league.id === newLeague;
    // });

    // IN THE FIND, THE CACHE IS WHAT IT WAS WHEN CACHE WAS SET ON INITIAL RENDER.
    // THE CLICK HANDLER WHEN CREATED REFERS TO ORIGINAL VALUE OF CACHE.
    // WHEN CLICK HANDLER COMPLETES AFTER THE FETCH, IT COMPLETES AGAINST ORIGINAL CACHE VALUE!

    // let testCacheItem;
    // // check cache
    // const dataInCache = () => {
    //   if (!cache) return false;
    //   console.log('cache', cache);
    //   testCacheItem = cache.find(
    //     (item: any) => item.response[0].league.id === newLeague
    //   );
    //   console.log('testcacheItem', testCacheItem);
    //   return testCacheItem;
    // };

    // if (testCacheItem) {
    //   setCurrentData(testCacheItem);
    // } else {
    //   await testFetch(newLeague);
    //   setCurrentData(testCacheItem);
    // }
    // setCurrentLeague(newLeague);
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center">
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
        <p className="text-center text-2xl font-bold">
          Click a league and bookie to get started!
        </p>
      )}
      <Footer />
    </div>
  );
};

export default App;
