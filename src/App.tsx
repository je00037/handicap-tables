import React, { FC, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';
import Loading from './components/Loading';
import BookiePicker from './components/BookiePicker';

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
    const [currentBookie, setCurrentBookie] = useState('Sky Bet');

    const clickHandler = (newBookie: string) => {
        setCurrentBookie(newBookie);
    }

    useEffect (() => {
        if (isLoading === true) {
            apiCall();
        }
    }, []);

    return isLoading ? <Loading /> :
    <div className='h-screen flex flex-col justify-between items-center'>
        <Header />
        <BookiePicker bookie={currentBookie} handleClick={clickHandler} />
        <Standings data={apiData} />
        <Footer />
    </div>
}

export default App;
