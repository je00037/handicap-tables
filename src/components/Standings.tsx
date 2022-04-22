import React, { FC } from 'react';
import { RowData, Bookies, ApiDataResponse, HandicapData } from '../interfaces';
import Row from './Row';
import HeadingsRow from './HeadingsRow';
import LoadingDots from './LoadingDots';
import { motion } from 'framer-motion';
import { getStandingsArray } from '../utils/getStandingsArray';
interface StandingsProps {
  bookie: Bookies;
  league: number;
  data: ApiDataResponse;
  loading: boolean;
  handicaps: HandicapData | undefined;
  sheetsLoading: boolean;
}

let standingsArray: Array<RowData> | undefined = [];

const Standings: FC<StandingsProps> = ({
  bookie,
  league,
  data,
  loading,
  handicaps,
  sheetsLoading,
}) => {
  const checkReady = (
    league: number,
    data: ApiDataResponse,
    handicaps: HandicapData | undefined,
    bookie: string | undefined
  ) => {
    if (!data || !bookie || !handicaps) {
      console.log('not ready, data is null');
      return;
    }
    if (league === data[0].league.id && handicaps.leagueID === league) {
      return true;
    } else return false;
  };

  const isReady = checkReady(league, data, handicaps, bookie);

  if (isReady === true) {
    standingsArray = getStandingsArray(data, bookie, league, handicaps);
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

  return eitherLoading ? (
    <LoadingDots />
  ) : (
    <table className="table-auto mx-2 w-10/12 text-center text-xs sm:text-sm">
      <motion.thead variants={variants2} initial="initial" animate="animate">
        <HeadingsRow />
      </motion.thead>
      {console.log('Standings component rendered')}
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
                />
              );
            })
          : null}
      </motion.tbody>
    </table>
  );
};

export default Standings;
