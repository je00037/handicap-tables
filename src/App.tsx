import React, { FC, useState, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { Bookies, ApiDataResponse } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import { useLazyFetch } from './hooks/useLazyFetch';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkSwitch } from './components/DarkSwitch';

// TO DO:
// - animate standings
// - extract getStandingsArray into own util
// - fix typing
// - handle error api response
// - consolidate/optimise the css classes
// - check for render optimisation
// - tidy up files and imports
// - sort out mobile responsiveness
// - background colour height bug / height in general
// - implement GA
// - write some tests

const App: FC = () => {
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [currentData, setCurrentData] = useState<ApiDataResponse>(null);

  const cache: any = useRef([]); // DEFINE THE CACHE IN USELAZYFETCH AND RETURN IT

  console.log(cache.current);

  const { getData, loading, error } = useLazyFetch();
  const [nextValue, setIsEnabled] = useDarkMode();

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
  };

  const isItemInCache = (newLeague: number) => {
    const item = cache.current.find(
      (item: any) => item[0].league.id === newLeague
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
      if (error) return console.log('oh no, error!', error);
      const item = cache.current.find((item: any) => {
        return item[0].league.id === newLeague;
      });
      setCurrentData(item);
    } else {
      const item = cache.current.find(
        (item: any) => item[0].league.id === newLeague
      );
      setCurrentData(item);
    }
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
        <Transition
          appear
          show
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <p className="text-center text-2xl pb-10 text-blue-900 dark:text-white">
            Select a league and a bookie to get started!
          </p>
        </Transition>
      )}
      <Footer />
    </div>
  );
};

export default App;
