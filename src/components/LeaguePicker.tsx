import React, { FC } from 'react';
import { supportedLeagues } from '../constants';

interface LeaguePickerProps {
  league: number | undefined;
  season: number | undefined;
  handleClick: (newLeague: number) => void;
}

const LeaguePicker: FC<LeaguePickerProps> = ({
  league,
  season,
  handleClick,
}) => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mb-2">
        {supportedLeagues.map((item, index) => {
          return (
            <button
              className={
                !season
                  ? 'button-disabled'
                  : league === item.apiId
                  ? 'button-selected'
                  : 'button'
              }
              onClick={() => handleClick(item.apiId)}
              key={index}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default LeaguePicker;
