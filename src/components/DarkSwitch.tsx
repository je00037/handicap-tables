import React, { FC } from 'react';
import { MoonIcon, LightBulbIcon } from '@heroicons/react/solid';

interface DarkSwitchProps {
  handleClick: any;
  nextValue: any;
}

export const DarkSwitch: FC<DarkSwitchProps> = ({ handleClick, nextValue }) => {
  return (
    <span className="pt-4" onClick={handleClick}>
      {nextValue === true ? (
        <MoonIcon className="h-8 w-8 p-1 bg-blue-600 shadow-lg text-yellow-100 rounded-full cursor-pointer" />
      ) : (
        <LightBulbIcon className="h-8 w-8 p-1 bg-gray-400 shadow-lg text-yellow-200 rounded-full cursor-pointer" />
      )}
    </span>
  );
};
