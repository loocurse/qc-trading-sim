import { useState } from "react";
import { getTickerLatestPrice } from "../api";
import { Action } from "../utils/journalReducer";

interface JournalModalProps {
  tickerValue?: number;
  dispatch: React.Dispatch<Action>;
}

function JournalModal({
  tickerValue = 112.12,
  dispatch,
}: JournalModalProps): JSX.Element {
  const [newPos, setNewPos] = useState({
    entry_price: tickerValue,
    ticker: "",
    date: new Date().toISOString(),
  });

  const saveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const current_price = await getTickerLatestPrice(newPos.ticker);
    dispatch({
      type: "ADD_OPEN_POSITION",
      data: {
        datetime: new Date(newPos.date).toString(),
        ticker: newPos.ticker,
        entry_price: newPos.entry_price,
        current_price,
      },
    });
    dispatch({ type: "TOGGLE_ADD_POSITION_MODAL" });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "entry_price":
        setNewPos({ ...newPos, entry_price: +event.target.value });
        break;
      case "ticker":
        setNewPos({ ...newPos, ticker: event.target.value });
        break;
      case "date":
        setNewPos({ ...newPos, date: event.target.value });
        break;
    }
  };

  return (
    <div className="modal">
      <h2 className="text-2xl font-bold mb-10">Add Position</h2>
      <form onSubmit={saveHandler} className="w-2/3">
        <div className="item mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Entry Price
          </label>
          <div className="">
            $
            <input
              type="number"
              id="entry_price"
              step="0.01"
              className="bg-gray-100 rounded p-3"
              value={newPos.entry_price}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Ticker
          </label>
          <input
            type="text"
            className="bg-gray-100 rounded p-3"
            value={newPos.ticker}
            name=""
            id="ticker"
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label htmlFor="" className="mr-3">
            Entry Date
          </label>
          <input
            type="date"
            className="bg-gray-100 rounded p-3"
            name=""
            id="date"
            defaultValue={"01-01-2020"}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => dispatch({ type: "TOGGLE_ADD_POSITION_MODAL" })}
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

export default JournalModal;
