import React, { FC } from 'react';
import { Leagues } from '../interfaces';
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
              className={league === item.id ? 'button-selected' : 'button'}
              onClick={() => handleClick(item.id)}
              key={index}
            >
              {item.name}
            </button>
          );
        })}

        {/* {league === 'PremierLeague' ? (
          <button className="button-selected">Premier League</button>
        ) : (
          <button
            className="button"
            onClick={() => {
              handleClick('PremierLeague');
            }}
          >
            Premier League
          </button>
        )}
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
        )} */}
      </div>
    </>
  );
};

export default LeaguePicker;
