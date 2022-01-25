import React, { FC } from 'react';
import { supportedBookies } from '../constants';
import { Bookies } from '../interfaces';

interface BookiePickerProps {
  bookie: Bookies;
  handleClick: (newBookie: Bookies) => void;
}

const BookiePicker: FC<BookiePickerProps> = ({ bookie, handleClick }) => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mb-4 -mt-2">
        {supportedBookies.map((item, index) => {
          return (
            <button
              className={bookie === item.name ? 'button-selected' : 'button'}
              onClick={() => handleClick(item.name as Bookies)}
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

export default BookiePicker;
