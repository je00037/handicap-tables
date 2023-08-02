import React, { FC } from 'react';

interface SeasonPickerProps {
  seasonID: number | undefined;
  handleClick: (newSeason: number) => void;
}

type Seasons = Record<string, string | number>[];

const seasons: Seasons = [
  {
    season: '2022/23',
    id: 2022,
  },
  {
    season: '2023/24',
    id: 2023,
  },
];

const LeaguePicker: FC<SeasonPickerProps> = ({ seasonID, handleClick }) => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mb-2">
        {seasons.map((item, index) => {
          return (
            <button
              className={seasonID === item.id ? 'button-selected' : 'button'}
              onClick={() => handleClick(item.id as number)}
              key={index}
            >
              {item.season}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default LeaguePicker;
