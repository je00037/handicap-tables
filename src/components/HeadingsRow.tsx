import React, { FC } from 'react';
interface HeadingsRowProps {
  league: number | string;
}

const HeadingsRow: FC<HeadingsRowProps> = ({ league }) => {
  return (
    <tr>
      <th></th>
      <th className="text-blue-900 dark:text-white">#</th>
      {league !== 39 ? (
        <th className="text-orange-400 dark:text-orange-300">Hc#</th>
      ) : null}
      <th className="text-blue-900 dark:text-white">Team</th>
      <th className="text-blue-900 dark:text-white">P</th>
      <th className="text-blue-900 dark:text-white">W</th>
      <th className="text-blue-900 dark:text-white">D</th>
      <th className="text-blue-900 dark:text-white">L</th>
      <th className="text-blue-900 dark:text-white">GF</th>
      <th className="text-blue-900 dark:text-white">GA</th>
      <th className="text-blue-900 dark:text-white">GD</th>
      <th className="text-blue-900 dark:text-white">Pts</th>
      {league !== 39 ? (
        <th className="text-orange-400 dark:text-orange-300">Hcap</th>
      ) : null}
      {league !== 39 ? (
        <th className="text-orange-400 dark:text-orange-300">HPpG</th>
      ) : null}
      <th className="text-emerald-400 dark:text-lime-200">Total</th>
    </tr>
  );
};

export default HeadingsRow;
