import React, { FC } from "react";

const HeadingsRow: FC = () => { return (
    <tr>
        <th></th>
        <th>#</th>
        <th className="text-orange-300">Hc#</th>
        <th>Team</th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>Pts</th>
        <th className="text-orange-300">Hcap</th>
        <th className="text-orange-300">HPpG</th>
        <th className="text-lime-200">Total</th>
    </tr>
    )
}

export default HeadingsRow;