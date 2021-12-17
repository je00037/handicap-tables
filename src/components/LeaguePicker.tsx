import React, { FC } from 'react';
import { supportedLeagues } from '../constants';

interface LeaguePickerProps {
  league: number | undefined;
  handleClick: (newLeague: number) => void;
}

const LeaguePicker: FC<LeaguePickerProps> = ({ league, handleClick }) => {
  return (
    <>
      <div className="-mb-2">
        {supportedLeagues.map((item, index) => {
          return (
            <button
              className={league === item.apiId ? 'button-selected' : 'button'}
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
