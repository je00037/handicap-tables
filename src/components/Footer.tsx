import React, { FC } from 'react';

const currentDate = new Date();
const year = currentDate.getFullYear();

const Footer: FC = () => (
  <footer className="py-8 px-8">
    <p className="text-center text-xs sm:text-sm dark:text-gray-400 text-gray-500">
      Football tables including the season betting handicaps and standings for
      the current and previous season from bookmakers including Sky Bet, Paddy
      Power, Betfair, Ladbrokes, Coral, William Hill, Betfred, and Bet 365.
      Leagues covered include the Premier League, Championship, League 1, and
      League 2.
    </p>
    <p className="py-1 text-center text-xs sm:text-sm dark:text-gray-400 text-gray-500">
      &#169; Ellis Norton Enterprises, {year}
    </p>
  </footer>
);

export default Footer;
