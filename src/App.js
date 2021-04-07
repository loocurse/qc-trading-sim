import "./App.scss";
import { useState, useRef, useReducer } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";
import Transactions from "./components/Transactions";
import { WalletIcon } from "./components/Icons";
import { initialState, reducer } from "./reducer";
import { parseDate } from "./utils";
import BABA_DATA from "./BABA.json";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [series, setSeries] = useState([]);
  const [updating, setUpdating] = useState(false);
  const intervalRef = useRef(null);

  // TODO slower updating interval
  // TODO buy button to be disabled prior to starting the simulation
  // TODO End the simulation after a certain time period
  // TODO Modal at the end to show algorithm's pnl vs participant's pnl
  // Every 0.5 seconds, append to data
  const triggerInterval = () => {
    if (updating) {
      clearInterval(intervalRef.current);
      setUpdating(false);
    } else {
      dispatch({ type: "START" });
      intervalRef.current = setInterval(() => {
        setSeries((oldData) => {
          const idx = oldData.length;
          if (idx === BABA_DATA.length) {
            triggerInterval();
            return oldData;
          }
          const price = BABA_DATA[idx].Close;
          const date = parseDate(BABA_DATA[idx].Date);

          const newDataPoint = {
            x: date,
            y: price,
          };
          if (idx > 0 && BABA_DATA[idx - 1].Indicator !== "") {
            if (!BABA_DATA[idx - 1].Indicator) {
              // 0 -> buy
              dispatch({
                type: "ALGO BUY",
                buy: {
                  price,
                  date,
                },
              });
            } else {
              dispatch({
                type: "ALGO SELL",
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
          newData.push(newDataPoint);
          return newData;
        });
      }, 500);
      setUpdating(true);
    }
  };

  return (
    <div>
      <nav>
        <div className="flex flex-1"></div>
        <h1 className="font-bold">Trading portal</h1>
        <div className="flex flex-1 justify-end items-center">
          <div className="flex items-center">
            <WalletIcon className="w-8 h-8 text-green-500 inline-block" />
            <span className="text-white font-bold ml-2">
              ${Math.round(state.cash).toLocaleString()}
            </span>
          </div>
          <button
            onClick={triggerInterval}
            className="bg-gray-100 px-6 py-1 rounded-full ml-8"
          >
            {updating ? "Stop" : "Start"}
          </button>
        </div>
      </nav>
      <div className="app">
        <div className="main mt-4">
          <div className="graph">
            <Graph series={series} annotation={state.annotation} />
          </div>
          <Buttons
            series={series}
            dispatch={dispatch}
            cash={state.cash}
            transactions={state.transactions}
            position={state.position}
            started={state.started}
          />
          <h2 className="font-bold mt-8 text-4xl">Transactions</h2>
          <Transactions className="mt-4" transactions={state.transactions} />
          <h2 className="font-bold mt-16 text-4xl">Algorithm Transactions</h2>
          <Transactions
            className="mt-4 mb-8"
            transactions={state.algoTransactions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
