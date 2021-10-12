import React, { FC } from "react";
import data from '../mock-table-data.json';

const dataToMap = data;

const Standings: FC = () => (
        <>
        <table className="table-auto w-6/12 text-center text-green-50">
                <thead>
                        <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                        <th>HPpG</th>
                        <th>Total</th>
                        <th>Hcap</th>
                        </tr>
                </thead>
                <tbody>
                        {dataToMap.map((item) => { return (
                                <tr>
                                        <td>{item.position}</td>
                                        <td>{item.team}</td>
                                        <td>{item.played}</td>
                                        <td>{item.won}</td>
                                        <td>{item.drawn}</td>
                                        <td>{item.lost}</td>
                                        <td>{item.scored}</td>
                                        <td>{item.conceded}</td>
                                        <td>{item.gdiff}</td>
                                        <td>{item.points}</td>
                                        <td>{item.hppg}</td>
                                        <td>{item.total}</td>
                                        <td>{item.handicap}</td>
                                </tr> )
                        })}
                </tbody>
        </table>
        </>
)

export default Standings;
