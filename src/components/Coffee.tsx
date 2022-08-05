import React, { FC } from 'react';

const Coffee: FC = () => (
  <div className="my-4">
    <p className="inline text-l dark:text-blue-900 text-white">
      If you like this, why not
    </p>
    <div className="inline py-2 px-4 ml-2 text-blue-900 font-bold bg-yellow-400 rounded-full border sm:border-2 border-solid dark:border-orange-400 border-amber-200">
      <a
        href="https://www.buymeacoffee.com/je00037"
        target="_blank"
        rel="noreferrer"
      >
        buy me a coffee?
      </a>
    </div>
  </div>
);

export default Coffee;
