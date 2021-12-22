import React, { FC } from 'react';
import { MoonIcon, LightBulbIcon } from '@heroicons/react/solid';

interface DarkSwitchProps {
  handleClick: () => void;
  nextValue: boolean;
}

export const DarkSwitch: FC<DarkSwitchProps> = ({ handleClick, nextValue }) => {
  return (
    <span className="pt-4" onClick={handleClick}>
      {nextValue === true ? (
        <MoonIcon className="h-8 w-8 p-1 bg-blue-800 shadow-lg text-yellow-100 rounded-full cursor-pointer border-2 border-solid border-yellow-200" />
      ) : (
        <LightBulbIcon className="h-8 w-8 p-1 bg-gray-400 shadow-lg text-yellow-200 rounded-full cursor-pointer border-2 border-solid border-yellow-100" />
      )}
    </span>
  );
};
