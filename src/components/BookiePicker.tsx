import React, { FC } from "react";

interface BookiePickerProps {
    bookie: string,
    handleClick: any;
}


const BookiePicker: FC<BookiePickerProps> = ( {bookie, handleClick} ) => {
    console.log(bookie);
    return (
        <> 
        <div className='-mt-2 mb-4'>
            {bookie === 'SkyBet' ? <button className="button-selected">Sky Bet</button> : <button className="button" onClick={() => {handleClick('SkyBet')}}>Sky Bet</button>}
            {bookie === 'PP/BF' ? <button className="button-selected">PP/BF</button> : <button className="button" onClick={() => {handleClick('PP/BF')}}>PP/BF</button>}
            {bookie === 'Ladbrokes' ? <button className="button-selected">Ladbrokes</button> : <button className="button" onClick={() => {handleClick('Ladbrokes')}}>Ladbrokes</button>}
            {bookie === 'William Hill' ? <button className="button-selected">William Hill</button> : <button className="button" onClick={() => {handleClick('William Hill')}}>William Hill</button>}
            {bookie === 'Bet 365' ? <button className="button-selected">Bet 365</button> : <button className="button" onClick={() => {handleClick('Bet 365')}}>Bet 365</button>}
        </div>
    </>
    )
}

export default BookiePicker;