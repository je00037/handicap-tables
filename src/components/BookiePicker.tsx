import React, { FC } from "react";

interface BookiePickerProps {
    bookie: string,
    handleClick: any;
}


const BookiePicker: FC<BookiePickerProps> = ( {bookie, handleClick} ) => {
    console.log(bookie);
    return (
        <> 
        <div>
            {bookie === 'Sky Bet' ? <button className="bookie-button-selected">Sky Bet</button> : <button className="bookie-button" onClick={() => {handleClick('Sky Bet')}}>Sky Bet</button>}
            {bookie === 'PP/BF' ? <button className="bookie-button-selected">PP/BF</button> : <button className="bookie-button" onClick={() => {handleClick('PP/BF')}}>PP/BF</button>}
            {bookie === 'Ladbrokes' ? <button className="bookie-button-selected">Ladbrokes</button> : <button className="bookie-button" onClick={() => {handleClick('Ladbrokes')}}>Ladbrokes</button>}
            {bookie === 'William Hill' ? <button className="bookie-button-selected">William Hill</button> : <button className="bookie-button" onClick={() => {handleClick('William Hill')}}>William Hill</button>}
            {bookie === 'Bet365' ? <button className="bookie-button-selected">Bet 365</button> : <button className="bookie-button" onClick={() => {handleClick('Bet 365')}}>Bet 365</button>}
        </div>
    </>
    )
}

export default BookiePicker;