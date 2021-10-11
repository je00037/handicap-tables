import React, { FC } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Standings from './components/Standings';

const App: FC = () => {
    return (
        <div className='h-screen flex flex-col justify-between items-center'>
            <Header />
            <Standings />
            <Footer />
        </div>
    )
}

export default App;
