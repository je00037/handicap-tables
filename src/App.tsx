import React, { FC, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bookies, ApiDataResponse, CacheRef } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import { useLazyFetch } from './hooks/useLazyFetch';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkSwitch } from './components/DarkSwitch';
import { useSheetsApi } from './hooks/useSheetsApi';
import { fireAnalytics } from './utils/fireAnalytics';

// TO DO:
// - handle error api response
// - consolidate/optimise the css classes
// - check for render optimisation
// - write some tests
// - try to make the type assertion and non-null coercion better in standings

const App: FC = () => {
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [currentData, setCurrentData] = useState<ApiDataResponse>(null);

  const cache: CacheRef = useRef([]); // DEFINE THE CACHE IN USELAZYFETCH AND RETURN IT

  const { getData, loading, error } = useLazyFetch();
  const [nextValue, setIsEnabled] = useDarkMode();

  const { handicaps, loading: sheetsLoading } = useSheetsApi(
    currentLeague,
    'ROWS'
  );

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
    fireAnalytics('Dark Mode', `${nextValue}`, 'Toggle');
  };

  const isItemInCache = (newLeague: number) => {
    const item = cache.current.find((item: ApiDataResponse) => {
      if (item === null) return false;
      return item[0].league.id === newLeague;
    });
    return !item ? false : true;
  };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
    fireAnalytics('Bookie', `${newBookie}`, 'Picker');
  };

  const clickHandlerLeague = async (newLeague: number) => {
    setCurrentLeague(newLeague);
    fireAnalytics('League', `${newLeague}`, 'Picker');
    if (isItemInCache(newLeague) === false) {
      await getData(newLeague, cache);
      if (error) return console.log('oh no, error!', error);
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return item[0].league.id === newLeague;
      });
      if (item === undefined) return console.log('error, item was undefined!');
      setCurrentData(item);
    } else {
      fireAnalytics('Cache', `${newLeague}`, 'Data Request');
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return item[0].league.id === newLeague;
      });
      if (item === undefined) return console.log('error, item was undefined!');
      setCurrentData(item);
    }
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <div
      className={
        'min-h-screen flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800'
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
          sheetsLoading={sheetsLoading}
          handicaps={handicaps}
        />
      ) : (
        <motion.p
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-xl pb-10 text-blue-900 dark:text-white"
        >
          Select a league and a bookie to get started!
        </motion.p>
      )}
      <Footer />
    </div>
  );
};

export default App;
