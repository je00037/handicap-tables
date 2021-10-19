import React, { FC } from "react";

const BookiePicker = () => {
    return (
        <>
        <label htmlFor="bookies" className="text-orange-300 mb-1">Choose a bookmaker:</label>
        <select name="bookies" id="bookies" className="rounded w-60 mb-6">
            <option selected value="sky-bet">Sky Bet</option>
            <option value="pp">Paddy Power</option>
            <option value="betfair">Betfair</option>
            <option value="hills">William Hill</option>
            <option value="lads">Ladbrokes</option>
        </select>
    </>
    )
}

export default BookiePicker;