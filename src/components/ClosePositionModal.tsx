import { useState } from "react";
import {
  payload,
  OpenPosition,
  ClosedPosition,
} from "../utils/journal.interface";
import { Action } from "../utils/journalReducer";

interface ClosePositionModalProps {
  currentTicker: payload;
  dispatch: React.Dispatch<Action>;
}

function ClosePositionModal({
  currentTicker,
  dispatch,
}: ClosePositionModalProps): JSX.Element {
  const [formInputs, setFormInputs] = useState({
    sell_price: currentTicker.sell_price,
    open_date: currentTicker.open_date,
    ticker: currentTicker.ticker,
    close_date: new Date().toISOString(),
  });

  const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Close modal
    dispatch({ type: "TOGGLE_CLOSE_POSITION_MODAL" });
    // Add entry to close position
    dispatch({
      type: "CLOSE_POSITION",
      data: {
        buy_price: currentTicker.buy_price,
        close_date: formInputs.close_date,
        open_date: currentTicker.open_date,
        sell_price: formInputs.sell_price,
        ticker: currentTicker.ticker,
      },
    });
  };

  return (
    <div className="modal p-10">
      <h2 className="text-2xl font-bold mb-10">Close Position</h2>
      <form onSubmit={saveHandler} className="w-2/3">
        <div className="item mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Entry Price
          </label>
          <div className="">
            <p className="font-bold">${currentTicker.buy_price}</p>
          </div>
        </div>
        <div className="item mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Sell Price
          </label>
          <div className="">
            $
            <input
              type="number"
              id="sell_price"
              step="0.01"
              className="bg-gray-100 rounded p-3"
              value={formInputs.sell_price}
            />
          </div>
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Ticker
          </label>
          <p className="font-bold">{formInputs.ticker}</p>
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Position Open Date
          </label>
          <p className="font-bold">27 June 2021</p>
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Close Date
          </label>
          <input
            type="date"
            className="bg-gray-100 rounded p-3"
            name=""
            id="date"
            value={"01-01-2020"}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => dispatch({ type: "TOGGLE_CLOSE_POSITION_MODAL" })}
            className="bg-gray-100 px-3 py-2 rounded-xl uppercase font-bold">
            Cancel
          </button>
          <button className="bg-primary px-3 py-2 rounded-xl ml-4 uppercase font-bold">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClosePositionModal;
