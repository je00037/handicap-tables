// import { motion } from 'framer-motion';
import React, { FC } from 'react';
// import BookiePicker from './components/BookiePicker';
// import Coffee from './components/Coffee';
// import { DarkSwitch } from './components/DarkSwitch';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import LeaguePicker from './components/LeaguePicker';
// import SeasonPicker from './components/SeasonPicker';
// import Standings from './components/Standings';
// import { useDarkMode } from './hooks/useDarkMode';
// import { useLazyFetch } from './hooks/useLazyFetch';
// import { useSheetsApi } from './hooks/useSheetsApi';
// import { Bookies, ApiDataResponse, CacheRef } from './interfaces';
// import { fireAnalytics } from './utils/fireAnalytics';
import RateLimit from './components/RateLimit';

// TO DO:
// - disable league buttons if no season selected
// - invert dark mode colors/theme
// - handle error api response
// - consolidate/optimise the css classes
// - check for render optimisation
// - write some tests
// - try to make the type assertion and non-null coercion better in standings

const App: FC = () => {
  // const [currentBookie, setCurrentBookie] = useState<Bookies>();
  // const [currentLeague, setCurrentLeague] = useState<number>();
  // const [currentData, setCurrentData] = useState<ApiDataResponse>(null);
  // const [currentSeason, setCurrentSeason] = useState<number>();
  // const [fullHcapToggle, setFullHcapToggle] = useState(false);

  // const cache: CacheRef = useRef([]); // DEFINE THE CACHE IN USELAZYFETCH AND RETURN IT

  // const { getData, loading, error } = useLazyFetch();
  // const [nextValue, setIsEnabled] = useDarkMode();

  // const { handicaps, loading: sheetsLoading } = useSheetsApi(
  //   currentLeague,
  //   currentSeason,
  //   'ROWS'
  // );

  // const clickHandlerDark = () => {
  //   setIsEnabled(nextValue);
  //   fireAnalytics('Dark Mode', `${nextValue}`, 'Toggle');
  // };

  // const isItemInCache = (league: number, season: number) => {
  //   const item = cache.current.find((item: ApiDataResponse) => {
  //     if (item === null) return false;
  //     return item[0].league.id === league && item[0].league.season === season;
  //   });
  //   const result = !item ? false : true;
  //   return result;
  // };

  // const clickHandlerSeason = async (newSeason: number) => {
  //   setCurrentSeason(newSeason);
  //   if (!currentLeague) return;
  //   if (isItemInCache(currentLeague, newSeason) === false) {
  //     await getData(currentLeague, newSeason, cache);
  //     if (error) return console.log('oh no, error!', error);
  //     const item = cache.current.find((item: ApiDataResponse) => {
  //       if (item === null) return console.log('error, item was null!');
  //       return (
  //         item[0].league.id === currentLeague &&
  //         item[0].league.season === newSeason
  //       );
  //     });
  //     if (item === undefined) return console.log('error, item was undefined!');
  //     setCurrentData(item);
  //   } else {
  //     fireAnalytics('Cache', `${newSeason}`, 'Data Request');
  //     const item = cache.current.find((item: ApiDataResponse) => {
  //       if (item === null) return console.log('error, item was null!');
  //       return (
  //         item[0].league.id === currentLeague &&
  //         item[0].league.season === newSeason
  //       );
  //     });
  //     if (item === undefined) return console.log('error, item was undefined!');
  //     setCurrentData(item);
  //   }
  //   fireAnalytics('Season', `${newSeason}`, 'Picker');
  // };

  // const clickHandlerBookie = (newBookie: Bookies) => {
  //   if (!currentSeason) return;
  //   setCurrentBookie(newBookie);
  //   fireAnalytics('Bookie', `${newBookie}`, 'Picker');
  // };

  // const clickHandlerLeague = async (newLeague: number) => {
  //   if (!currentSeason) return;
  //   setCurrentLeague(newLeague);
  //   fireAnalytics('League', `${newLeague}`, 'Picker');
  //   if (isItemInCache(newLeague, currentSeason) === false) {
  //     await getData(newLeague, currentSeason, cache);
  //     if (error) return console.log('oh no, error!', error);
  //     const item = cache.current.find((item: ApiDataResponse) => {
  //       console.log({ item });
  //       if (item === null) {
  //         console.log('no item!');
  //         return console.log('error, item was null!');
  //       }
  //       console.log('accessing item...');
  //       return (
  //         item[0].league.id === newLeague &&
  //         item[0].league.season === currentSeason
  //       );
  //     });
  //     if (item === undefined) return console.log('error, item was undefined!');
  //     setCurrentData(item);
  //   } else {
  //     fireAnalytics('Cache', `${newLeague}`, 'Data Request');
  //     const item = cache.current.find((item: ApiDataResponse) => {
  //       if (item === null) return console.log('error, item was null!');
  //       return (
  //         item[0].league.id === newLeague &&
  //         item[0].league.season === currentSeason
  //       );
  //     });
  //     if (item === undefined) return console.log('error, item was undefined!');
  //     setCurrentData(item);
  //   }
  // };

  // const clickHandlerHcapToggle = () => {
  //   setFullHcapToggle((prevState) => !prevState);
  // };

  // const variants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 },
  // };

  // return (
  //   <div
  //     className={
  //       'min-h-screen flex flex-col justify-between items-center dark:bg-gray-200 bg-gray-800'
  //     }
  //   >
  //     <div className="flex flex-col justify-center items-center">
  //       <DarkSwitch handleClick={clickHandlerDark} nextValue={nextValue} />

  //       <p className="my-2 text-yellow-200 dark:text-blue-900 text-center">
  //         &#x1F389; &nbsp; <span className="font-bold">New for 2024/25:</span>
  //         <br />
  //         If you noticed blank tables occasionally before, this should no longer
  //         happen. <br />
  //         Secondly, when using the Points-per-Game total a bug with rounding for
  //         the end of the season has been fixed.
  //       </p>
  //       <p className="my-2 text-yellow-200 dark:text-blue-900 text-center">
  //         <span className="font-bold">DID YOU KNOW?!</span> Tap the Total
  //         column-heading to toggle the sort method between PpG and total
  //         handicap.
  //       </p>
  //       <Coffee />
  //       <Header />
  //       <SeasonPicker
  //         seasonID={currentSeason}
  //         handleClick={clickHandlerSeason}
  //       />
  //       <LeaguePicker
  //         league={currentLeague}
  //         season={currentSeason}
  //         handleClick={clickHandlerLeague}
  //       />
  //       <BookiePicker
  //         bookie={currentBookie}
  //         season={currentSeason}
  //         handleClick={clickHandlerBookie}
  //       />
  //     </div>
  //     {error ? (
  //       <p>
  //         Sorry, there has been a problem fetching the data today. Please try
  //         again tomorrow.
  //       </p>
  //     ) : currentSeason && currentLeague && currentBookie ? (
  //       <Standings
  //         bookie={currentBookie}
  //         league={currentLeague}
  //         season={currentSeason}
  //         data={currentData}
  //         loading={loading}
  //         sheetsLoading={sheetsLoading}
  //         handicaps={handicaps}
  //         fullHcapToggle={fullHcapToggle}
  //         hcapToggleHandler={clickHandlerHcapToggle}
  //       />
  //     ) : (
  //       <motion.p
  //         initial="hidden"
  //         animate="visible"
  //         variants={variants}
  //         transition={{ delay: 0.2, duration: 0.5 }}
  //         className="text-center text-xl pb-10 dark:text-blue-900 text-white"
  //       >
  //         Choose a Season to get started!
  //       </motion.p>
  //     )}
  //     <Footer />
  //   </div>
  // );
  return (
    <div
      className={
        'min-h-screen flex flex-col justify-center items-center dark:bg-gray-200 bg-gray-800'
      }
    >
      <RateLimit />
    </div>
  );
};

export default App;
