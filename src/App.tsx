import React, { FC, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import Loading from './components/Loading';

const App: any = () => {

    let dataPlaceholder: any;

    const requestHeaders = {
        headers: {
            'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a'
        }
    }

    const apiCall: any = async () => {
        const response = await fetch('http://api.football-data.org/v2/competitions/2016/standings', requestHeaders);
        dataPlaceholder = await response.json();
        setApiData(dataPlaceholder);
        setIsLoading(false);
    }

    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        if (isLoading === true) {
            apiCall();
        }
    }, []);

    return isLoading ? <Loading /> :
    <div className='h-screen flex flex-col justify-between items-center'>
        <Header />
        <Standings data={apiData} />
        <Footer />
    </div>
}

export default App;
