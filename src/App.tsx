import React, { FC, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import Loading from './components/Loading';

const requestHeaders = {
    headers: {
            'X-Auth-Token': '05b09d4d6ebf494aae53d256c80fc85a'
    }
}

const apiCall: any = async () => {
    const response = await fetch('http://api.football-data.org/v2/competitions/2016/standings', requestHeaders);
    const json = await response.json();
    return json;
}

const App: FC = () => {

    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let data = apiCall();
        setApiData(data);
        setIsLoading(false);
    }, []);

    //pass apiData as a prop to Standings...

    return isLoading ? <Loading /> :
        ( <div className='h-screen flex flex-col justify-between items-center'>
            <Header />
            <Standings />
            <Footer />
        </div> )
}

export default App;
