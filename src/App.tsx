import React, { FC } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App: FC = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <Header />
            <Footer />
        </div>
    )
}

export default App;
