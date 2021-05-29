import "./App.scss";
import { useState, useRef, useReducer } from "react";
import {
  Buttons,
  Graph,
  Transactions,
  NavigationBar,
  ResultModal,
} from "./components";
import React from "react";
import { initialState, reducer } from "./reducer";
import { parseDate } from "./utils";
import BABA_DATA from "./mockdata/BABA.json";
import FundamentalInfo from "./components/FundamentalInfo";
import { ActionTypes } from "./reducer";

function App(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [series, setSeries] = useState([]);
  const [updating, setUpdating] = useState(false);
  const intervalRef = useRef(null);

  const priceData = BABA_DATA.prices;

  // TODO slower updating interval
  // Every 0.5 seconds, append to data
  const triggerInterval = () => {
    if (state.status === "ENDED") {
      dispatch({ type: ActionTypes.showResultModal });
    } else if (!updating) {
      if (state.status === "WAITING") dispatch({ type: ActionTypes.start });
      intervalRef.current = setInterval(() => {
        setSeries((oldData) => {
          const idx = oldData.length;
          if (idx === priceData.length) {
            clearInterval(intervalRef.current);
            setUpdating(false);
            dispatch({ type: ActionTypes.end });
            return oldData;
          }
          const price = priceData[idx].Close;
          const date = parseDate(priceData[idx].Date);
          if (idx > 0 && priceData[idx - 1].Indicator !== "") {
            if (!priceData[idx - 1].Indicator) {
              // 0 -> buy
              dispatch({
                type: ActionTypes.algoBuy,
                buy: {
                  price,
                  date,
                },
              });
            } else {
              dispatch({
                type: ActionTypes.algoSell,
                sell: {
                  price,
                  date,
                },
              });
            }
          }
          const newData = oldData.slice();
          // TODO Memory Leak issue
          // Array size will grow linearly without limits, probably need to find
          // a way to resize the array once in a while.
          // https://github.com/apexcharts/react-apexcharts/issues/132
          newData.push({ x: date, y: price });
          return newData;
        });
      }, 500);
      setUpdating(true);
    } else {
      clearInterval(intervalRef.current);
      setUpdating(false);
    }
  };

  return (
    <div>
      <NavigationBar
        buttonCallback={triggerInterval}
        updating={updating}
        status={state.status}
      />
      <div className="app">
        <div className="main mt-4">
          {state.status === "ENDED" && state.modalOpen && (
            <ResultModal
              cash={state.cash}
              algoPosition={state.algoPosition}
              dispatch={dispatch}
            />
          )}
          <div className="graph d-flex flex-col">
            <Graph
              series={series}
              annotation={state.annotation}
              ticker={state.ticker}
              dispatch={dispatch}
            />
            <FundamentalInfo />
          </div>
          <Buttons
            series={series}
            dispatch={dispatch}
            cash={state.cash}
            transactions={state.transactions}
            position={state.position}
            status={state.status}
          />
          <div className="mt-8 flex w-full col-span-full space-x-12">
            <div className="flex-1">
              <h2 className="font-bold text-4xl">My History</h2>
              <Transactions
                className="mt-4"
                transactions={state.transactions}
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-4xl text-right">
                Algorithm History
              </h2>
              <Transactions
                className="mt-4 mb-8"
                transactions={state.algoTransactions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
