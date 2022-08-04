import React, { FC, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bookies, ApiDataResponse, CacheRef } from './interfaces';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import SeasonPicker from './components/SeasonPicker';
import { useLazyFetch } from './hooks/useLazyFetch';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkSwitch } from './components/DarkSwitch';
import { useSheetsApi } from './hooks/useSheetsApi';
import { fireAnalytics } from './utils/fireAnalytics';

// TO DO:
// - disable league buttons if no season selected
// - invert dark mode colors/theme
// - handle error api response
// - consolidate/optimise the css classes
// - check for render optimisation
// - write some tests
// - try to make the type assertion and non-null coercion better in standings

const App: FC = () => {
  const [currentBookie, setCurrentBookie] = useState<Bookies>();
  const [currentLeague, setCurrentLeague] = useState<number>();
  const [currentData, setCurrentData] = useState<ApiDataResponse>(null);
  const [currentSeason, setCurrentSeason] = useState<number>();

  const cache: CacheRef = useRef([]); // DEFINE THE CACHE IN USELAZYFETCH AND RETURN IT

  const { getData, loading, error } = useLazyFetch();
  const [nextValue, setIsEnabled] = useDarkMode();

  const { handicaps, loading: sheetsLoading } = useSheetsApi(
    currentLeague,
    currentSeason,
    'ROWS'
  );

  const clickHandlerDark = () => {
    setIsEnabled(nextValue);
    fireAnalytics('Dark Mode', `${nextValue}`, 'Toggle');
  };

  const isItemInCache = (league: number, season: number) => {
    const item = cache.current.find((item: ApiDataResponse) => {
      if (item === null) return false;
      return item[0].league.id === league && item[0].league.season === season;
    });
    const result = !item ? false : true;
    return result;
  };

  const clickHandlerSeason = async (newSeason: number) => {
    setCurrentSeason(newSeason);
    if (!currentLeague) return;
    if (isItemInCache(currentLeague, newSeason) === false) {
      await getData(currentLeague, newSeason, cache);
      if (error) return console.log('oh no, error!', error);
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return (
          item[0].league.id === currentLeague &&
          item[0].league.season === newSeason
        );
      });
      if (item === undefined) return console.log('error, item was undefined!');
      setCurrentData(item);
    } else {
      fireAnalytics('Cache', `${newSeason}`, 'Data Request');
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return (
          item[0].league.id === currentLeague &&
          item[0].league.season === newSeason
        );
      });
      if (item === undefined) return console.log('error, item was undefined!');
      setCurrentData(item);
    }
    fireAnalytics('Season', `${newSeason}`, 'Picker');
  };

  const clickHandlerBookie = (newBookie: Bookies) => {
    setCurrentBookie(newBookie);
    fireAnalytics('Bookie', `${newBookie}`, 'Picker');
  };

  const clickHandlerLeague = async (newLeague: number) => {
    setCurrentLeague(newLeague);
    fireAnalytics('League', `${newLeague}`, 'Picker');
    if (!currentSeason) return;
    if (isItemInCache(newLeague, currentSeason) === false) {
      await getData(newLeague, currentSeason, cache);
      if (error) return console.log('oh no, error!', error);
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return (
          item[0].league.id === newLeague &&
          item[0].league.season === currentSeason
        );
      });
      if (item === undefined) return console.log('error, item was undefined!');
      setCurrentData(item);
    } else {
      fireAnalytics('Cache', `${newLeague}`, 'Data Request');
      const item = cache.current.find((item: ApiDataResponse) => {
        if (item === null) return console.log('error, item was null!');
        return (
          item[0].league.id === newLeague &&
          item[0].league.season === currentSeason
        );
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
        'min-h-screen flex flex-col justify-between items-center dark:bg-gray-200 bg-gray-800'
      }
    >
      <div className="flex flex-col justify-center items-center">
        <DarkSwitch handleClick={clickHandlerDark} nextValue={nextValue} />
        <Header />
        <SeasonPicker
          seasonID={currentSeason}
          handleClick={clickHandlerSeason}
        />
        <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
        <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
      </div>
      {currentSeason && currentLeague && currentBookie ? (
        <Standings
          bookie={currentBookie}
          league={currentLeague}
          season={currentSeason}
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
          className="text-center text-xl pb-10 dark:text-blue-900 text-white"
        >
          Select a league and a bookie to get started!
        </motion.p>
      )}
      <Footer />
    </div>
  );
};

export default App;
