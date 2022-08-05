import React, { FC } from 'react';
import JugglingImage from '../images/juggling.png';

const RateLimit: FC = () => (
  <div>
    <p className="text-center text-m sm:text-sm dark:text-gray-400 text-white-500">
      We are experiencing a lot of traffic right now and cannot display the
      tables. Sorry about this. Please check back later.
    </p>
  </div>
);

export default RateLimit;
