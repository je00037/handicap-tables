import React, { FC } from 'react';
import { RowData, Bookies, ApiDataResponse } from '../interfaces';
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
}

let standingsArray: Array<RowData> | undefined = [];

const Standings: FC<StandingsProps> = ({ bookie, league, data, loading }) => {
  const checkReady = (league: number, data: ApiDataResponse) => {
    if (data === null) {
      console.log('not ready, data is null');
      return;
    }
    if (league === data[0].league.id) {
      return true;
    } else return false;
  };

  const isReady = checkReady(league, data);

  if (isReady === true) {
    standingsArray = getStandingsArray(data, bookie, league);
  }

  const variants = {
    // initial: {
    //   opacity: 0,
    // },
    // animate: {
    //   opacity: 1,
    //   transition: {
    //     staggerChildren: 0.06,
    //     staggerDirection: 1,
    //   },
    //   default: { staggerChildren: 0.06, staggerDirection: 1 },
    // },
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return loading ? (
    <LoadingDots />
  ) : (
    <table className="table-auto mx-2 w-6/12 text-center text-xs sm:text-sm">
      <thead>
        <HeadingsRow league={league} />
      </thead>
      {console.log('Standings component rendered')}
      <motion.tbody
        variants={variants}
        initial="initial"
        animate="animate"
        layout
      >
        {standingsArray !== undefined
          ? standingsArray.map((item, index) => {
              console.log('Standings array mapper ' + index);
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
