import React, { FC } from "react";
import data from '../mock-table-data.json';
import Row from './Row';
import HeadingsRow from './HeadingsRow';

const dataToMap = data;

const Standings: FC = () => (
        <>
        <table className="table-auto w-6/12 text-center text-green-50">
                <thead>
                        <HeadingsRow />
                </thead>
                <tbody>
                        {dataToMap.map((item) => <Row rowData={item} />)}
                </tbody>
        </table>
        </>
)

export default Standings;
