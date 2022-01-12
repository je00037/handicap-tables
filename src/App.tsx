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

// TO DO:
// - extract getStandingsArray into own util
// - handle error api response
// - consolidate/optimise the css classes
// - check for render optimisation
// - tidy up files and imports
// - sort out mobile responsiveness
// - background colour height bug / height in general
// - write some tests
// - try to make the type assertion and non-null coercion better in standings

const App: FC = () => {
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [currentData, setCurrentData] = useState<ApiDataResponse>(null);

  const cache: CacheRef = useRef([]); // DEFINE THE CACHE IN USELAZYFETCH AND RETURN IT

  console.log(cache.current);

  const { getData, loading, error } = useLazyFetch();
  const [nextValue, setIsEnabled] = useDarkMode();

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
    window.gtag('event', 'Toggle', {
      event_category: 'Dark Mode',
      event_label: `${nextValue}`,
    });
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
    window.gtag('event', 'Picker', {
      event_category: 'Bookie',
      event_label: `${newBookie}`,
    });
  };

  const clickHandlerLeague = async (newLeague: number) => {
    setCurrentLeague(newLeague);
    window.gtag('event', 'Picker', {
      event_category: 'League',
      event_label: `${newLeague}`,
    });
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
      window.gtag('event', 'Data Request', {
        event_category: 'Cache',
        event_label: `${newLeague}`,
      });
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
        <motion.p
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-2xl pb-10 text-blue-900 dark:text-white"
        >
          Select a league and a bookie to get started!
        </motion.p>
      )}
      <Footer />
    </div>
  );
};

export default App;
