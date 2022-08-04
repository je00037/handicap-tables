import React, { FC } from 'react';

const HeadingsRow: FC = () => {
  return (
    <tr>
      <th></th>
      <th className="px-1 dark:text-blue-900 text-white">#</th>
      <th className="px-1 dark:text-orange-400 text-orange-300">Hc#</th>
      <th className="px-1 dark:text-blue-900 text-white">Team</th>
      <th className="px-1 dark:text-blue-900 text-white">P</th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        W
      </th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        D
      </th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        L
      </th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        GF
      </th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        GA
      </th>
      <th className="px-1 hidden sm:table-cell dark:text-blue-900 text-white">
        GD
      </th>
      <th className="px-1 dark:text-blue-900 text-white">Pts</th>
      <th className="px-1 dark:text-orange-400 text-orange-300">Hcap</th>
      <th className="px-1 dark:text-orange-400 text-orange-300">PpG</th>
      <th className="px-1 dark:text-emerald-400 text-lime-200">Total</th>
    </tr>
  );
};

export default HeadingsRow;
