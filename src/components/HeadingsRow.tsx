import React, { FC } from 'react';

const HeadingsRow: FC = () => {
  return (
    <tr>
      <th></th>
      <th className="px-1 text-blue-900 dark:text-white">#</th>
      <th className="px-1 text-orange-400 dark:text-orange-300">Hc#</th>
      <th className="px-1 text-blue-900 dark:text-white">Team</th>
      <th className="px-1 text-blue-900 dark:text-white">P</th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        W
      </th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        D
      </th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        L
      </th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        GF
      </th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        GA
      </th>
      <th className="px-1 hidden sm:table-cell text-blue-900 dark:text-white">
        GD
      </th>
      <th className="px-1 text-blue-900 dark:text-white">Pts</th>
      <th className="px-1 text-orange-400 dark:text-orange-300">Hcap</th>
      <th className="px-1 text-orange-400 dark:text-orange-300">PpG</th>
      <th className="px-1 text-emerald-400 dark:text-lime-200">Total</th>
    </tr>
  );
};

export default HeadingsRow;
