import React, { FC } from 'react';

interface HeadingsRowProps {
  handler: () => void;
}

const HeadingsRow: FC<HeadingsRowProps> = ({ handler }) => {
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
      <th className="px-1 dark:text-emerald-400 text-lime-200">
        <div
          className="py-1 px-1 border border-lime-200 dark:border-emerald-400 rounded-md bg-gray-800 dark:bg-gray-200 cursor-pointer"
          onClick={() => handler()}
        >
          Total
        </div>
      </th>
    </tr>
  );
};

export default HeadingsRow;
