import React, { FC } from 'react';
import JugglingImage from '../images/juggling.png';

const NoHandicaps: FC = () => (
  <div className="pb-10">
    <img
      src={JugglingImage}
      width="175"
      height="175"
      className="ml-10 mb-4"
    ></img>
    <p>We don&apos;t have handicaps for this bookie yet!</p>
  </div>
);

export default NoHandicaps;
