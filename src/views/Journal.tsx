import OpenTable from "../components/OpenTable";
import CloseTable from "../components/CloseTable";
import { useReducer, useEffect } from "react";
import JournalModal from "../components/JournalModal";
import ClosePositionModal from "../components/ClosePositionModal";
import {
  journalReducer as reducer,
  initialState,
  calculateProfit,
} from "../utils/journalReducer";
import { openPositions, closedPositions } from "../utils/data.json";
import { getTickerLatestPrice } from "../api";

function Journal(): JSX.Element {
  const [
    {
      openPosition,
      closedPosition,
      addPositionModal,
      closePositionModal,
      currentTicker,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const promises = openPositions.map((item) => {
      return getTickerLatestPrice(item.ticker).then((price) => {
        const current_price = +price.toFixed(2);
        const profit = +((current_price / item.entry_price - 1) * 100).toFixed(
          1
        );
        return { ...item, current_price, profit };
      });
    });
    Promise.all(promises).then((results) => {
      dispatch({ type: "SET_OPEN_POSITIONS", data: results });
    });

    dispatch({
      type: "SET_CLOSED_POSITIONS",
      data: closedPositions.map((item) => {
        return {
          ...item,
          profit: calculateProfit(item.entry_price, item.close_price),
        };
      }),
    });
  }, []);

  return (
    <div>
      {closePositionModal && (
        <ClosePositionModal currentTicker={currentTicker} dispatch={dispatch} />
      )}

      {addPositionModal && <JournalModal dispatch={dispatch} />}

      <OpenTable openPosition={openPosition} dispatch={dispatch} />
      <h2 className="text-2xl font-bold my-3">Closed positions</h2>
      <CloseTable closedPosition={closedPosition} dispatch={dispatch} />
    </div>
  );
}

export default Journal;
