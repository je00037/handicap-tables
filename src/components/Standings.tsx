import React, { FC } from 'react';
import { RowData, Bookies, ApiDataResponse, HandicapData } from '../interfaces';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import LoadingDots from './LoadingDots';
import NoHandicaps from './NoHandicaps';
import { motion } from 'framer-motion';
import { getStandingsArray } from '../utils/getStandingsArray';
interface StandingsProps {
  bookie: Bookies;
  league: number;
  season: number;
  data: ApiDataResponse;
  loading: boolean;
  handicaps: HandicapData | undefined;
  sheetsLoading: boolean;
  fullHcapToggle: boolean;
  hcapToggleHandler: () => void;
}

let standingsArray: Array<RowData> | undefined = [];

const Standings: FC<StandingsProps> = ({
  bookie,
  league,
  season,
  data,
  loading,
  handicaps,
  sheetsLoading,
  fullHcapToggle,
  hcapToggleHandler,
}) => {
  const checkReady = (
    league: number,
    season: number,
    data: ApiDataResponse,
    handicaps: HandicapData | undefined,
    bookie: string | undefined
  ) => {
    if (!data || !bookie || !handicaps) {
      console.log('not ready, data is null');
      return;
    }
    if (
      league === data[0].league.id &&
      handicaps.leagueID === league &&
      handicaps.season === data[0].league.season
    ) {
      return true;
    } else return false;
  };

  const isReady = checkReady(league, season, data, handicaps, bookie);

  if (isReady === true) {
    standingsArray = getStandingsArray(
      data,
      bookie,
      league,
      handicaps,
      fullHcapToggle
    );
  }

  const eitherLoading = loading || sheetsLoading;

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };

  const variants2 = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.1,
      },
    },
  };
  if (
    (league === 39 && season === 2021 && bookie === 'Hills') ||
    (league === 41 && season === 2021 && bookie === 'Hills') ||
    (league === 39 && season === 2022 && bookie === 'PPBF') ||
    (league === 39 && season === 2022 && bookie === 'Lads Coral') ||
    (league === 40 && season === 2022 && bookie === 'PPBF') ||
    (league === 41 && season === 2022 && bookie === 'PPBF') ||
    (league === 42 && season === 2022 && bookie === 'PPBF')
  )
    return <NoHandicaps />;
  return eitherLoading ? (
    <LoadingDots />
  ) : (
    <table className="table-auto mx-2 w-10/12 text-center text-xs sm:text-sm">
      <motion.thead variants={variants2} initial="initial" animate="animate">
        <HeadingsRow handler={hcapToggleHandler} />
      </motion.thead>
      <motion.tbody variants={variants} initial="initial" animate="animate">
        {standingsArray !== undefined
          ? standingsArray.map((item, index) => {
              const hcapPos = index + 1;
              return (
                <Row
                  rowData={item}
                  key={index}
                  hcapPos={hcapPos}
                  rowIndex={index}
                  fullHcap={fullHcapToggle}
                />
              );
            })
          : null}
      </motion.tbody>
    </table>
  );
};

export default Standings;
