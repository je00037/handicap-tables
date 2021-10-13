import React, { FC } from "react";
import data from '../mock-table-data.json';
import Row from './Row';

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
                                <Row rowData={item} /> 
                        )
                        })}
                </tbody>
        </table>
        </>
)

export default Standings;
