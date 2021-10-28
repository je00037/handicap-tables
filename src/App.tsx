import React, { FC, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import BookiePicker from './components/BookiePicker';
import LeaguePicker from './components/LeaguePicker';
import LoadingDots from './components/LoadingDots';

const App: FC = () => {

    // add a state variable to track the selected bookie. Select Sky Bet by default
    // add a new function like onClick which takes an argument of a new bookie and updates the selected bookie state
    // pass this onClick function to the Bookie Picker as a prop
    // pass the currently selected bookie as a prop to Standings and to Bookie Picker so the selected button style can be updated
    // Standings will use that selected bookie for retrieving the handicap values in getStandingsArray
    // in Bookie Picker each button needs to call onClick with the dynamic value of that button, the argument passed to it being a variable which holds the value of the button?

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
    const [currentBookie, setCurrentBookie] = useState('SkyBet');
    const [currentLeague, setCurrentLeague] = useState('Championship');

    const clickHandlerBookie = (newBookie: string) => {
        setCurrentBookie(newBookie);
    }

    const clickHandlerLeague = (newLeague: string) => {
        setCurrentLeague(newLeague);
    }

    useEffect (() => {
        if (isLoading === true) {
            setTimeout(() => apiCall(), 3000);
        }
    }, []);

    return isLoading ? <LoadingDots /> :
    <div className='h-screen flex flex-col justify-between items-center'>
        <Header />
        <LeaguePicker league={currentLeague} handleClick={clickHandlerLeague} />
        <BookiePicker bookie={currentBookie} handleClick={clickHandlerBookie} />
        <Standings data={apiData} bookie={currentBookie} />
        <Footer />
    </div>
}

export default App;
