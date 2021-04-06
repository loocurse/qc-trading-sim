import "./App.scss";
import { useState, useRef, useReducer } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";
import Transactions from "./components/Transactions";
import { WalletIcon } from "./components/Icons";
import { initialState, reducer } from "./reducer";
import { getNextDay, generateData } from "./utils";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [series, setSeries] = useState(generateData);
  const [updating, setUpdating] = useState(false);
  const intervalRef = useRef(null);

  // Every 1 seconds, append to data
  const triggerInterval = () => {
    if (updating) {
      clearInterval(intervalRef.current);
      setUpdating(false);
    } else {
      intervalRef.current = setInterval(() => {
        setSeries((oldData) => {
          let price = Math.abs(
            (Math.random() - 0.48) * 6 + oldData[oldData.length - 1].y
          );

          const newDataPoint = {
            x: getNextDay(oldData[oldData.length - 1].x, 1),
            y: price, // p(t+1) is dependent on p(t)
          };
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
        <div className="main">
          <div className="graph">
            <Graph series={series} annotation={state.annotation} />
          </div>
          <Buttons
            series={series}
            dispatch={dispatch}
            cash={state.cash}
            transactions={state.transactions}
            position={state.position}
          />
          <Transactions className="mt-8" />
        </div>
      </div>
    </div>
  );
}

export default App;
