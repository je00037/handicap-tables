import React, { FC, useState, useEffect, useRef } from 'react';
import { Bookies } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import { useLazyFetch } from './utils/useLazyFetch';
import { useDarkMode } from './utils/useDarkMode';
import { DarkSwitch } from './components/DarkSwitch';

const App: FC = () => {
  console.log('app rendered');
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [currentData, setCurrentData] = useState<any>();

  const cache = useRef([]);

  const { getData, loading, error } = useLazyFetch();
  const [nextValue, setIsEnabled] = useDarkMode();

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
  };

  const isItemInCache = (newLeague: number) => {
    const item = cache.current.find(
      (item: any) => item.response[0].league.id === newLeague
    );
    return !item ? false : true;
  };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
  };
  const clickHandlerLeague = async (newLeague: number) => {
    setCurrentLeague(newLeague);
    if (isItemInCache(newLeague) === false) {
      await getData(newLeague, cache);
      const item = cache.current.find((item: any) => {
        return item.response[0].league.id === newLeague;
      });
      setCurrentData(item); // PROBLEM HERE WHEN STANDINGS ALREADY RENDERED AND CHOOSING ANOTHER LEAGUE WHICH NEEDS TO FETCH - STANDINGS RERENDER BEFORE CURRENTDATA HAS BEEN SET
    } else {
      const item = cache.current.find(
        (item: any) => item.response[0].league.id === newLeague
      );
      setCurrentData(item);
    }

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
