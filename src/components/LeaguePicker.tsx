import React, { FC } from 'react';

interface LeaguePickerProps {
  league: string;
  handleClick: any;
}

const LeaguePicker: FC<LeaguePickerProps> = ({ league, handleClick }) => {
  return (
    <>
      <div className="-mb-2">
        {league === 'Championship' ? (
          <button className="button-selected">Championship</button>
        ) : (
          <button
            className="button"
            onClick={() => {
              handleClick('Championship');
            }}
          >
            Championship
          </button>
        )}
        {league === 'League 1' ? (
          <button className="button-selected">League 1</button>
        ) : (
          <button
            className="button"
            onClick={() => {
              handleClick('League 1');
            }}
          >
            League 1
          </button>
        )}
        {league === 'League 2' ? (
          <button className="button-selected">League 2</button>
        ) : (
          <button
            className="button"
            onClick={() => {
              handleClick('League 2');
            }}
          >
            League 2
          </button>
        )}
      </div>
    </>
  );
};

export default LeaguePicker;
