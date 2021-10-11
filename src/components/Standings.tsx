import React, { FC } from "react";
import Row from './Row';

const Standings: FC = () => (
        <>
        <table className="table-auto w-6/12 text-center text-green-50">
                <thead>
                        <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>Handicap</th>
                        <th>Points</th>
                        </tr>
                </thead>
                <tbody>
                        <tr>
                        <td>1st</td>
                        <td>Arsenal</td>
                        <td>15</td>
                        <td>-22pts</td>
                        <td>44pts</td>
                        </tr>
                        <tr>
                        <td>2nd</td>
                        <td>Everton</td>
                        <td>14</td>
                        <td>-20pts</td>
                        <td>40pts</td>
                        </tr>
                        <tr>
                        <td>3rd</td>
                        <td>Wolves</td>
                        <td>13</td>
                        <td>-18pts</td>
                        <td>39pts</td>
                        </tr>
                </tbody>
        </table>
        </>
)

export default Standings;