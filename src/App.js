import "./App.scss";
import { useState, useRef, useReducer } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";
import Transactions from "./components/Transactions";
import { WalletIcon } from "./components/Icons";

const getNextDay = (date, days) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + days);
  return nextDay;
};

const generateData = () => {
  let xaxis = [];
  const date = new Date();
  for (let i = 0; i < 10; i++) {
    xaxis.push(getNextDay(date, i));
  }
  const yaxis = [10, 15, 13, 12, 10, 14, 9, 7, 6, 7, 10];
  return xaxis.map((value, idx) => {
    return { x: value, y: yaxis[idx] };
  });
}; // [{x: day 1, y: price}, {x: day 2, y: price}, ...]

const initialState = {
  cash: 1000,
  position: 100,
  transactions: {
    buy: [],
    sell: [],
  },
  annotation: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "BUY": {
      const transactions = {
        ...state.transactions,
        buy: [...state.transactions.buy, action.buyPrice],
      };
      const annotation = [
        {
          y: action.buyPrice,
          borderColor: "#006400",
          label: {
            borderColor: "#006400",
            style: {
              color: "#fff",
              background: "#006400",
            },
            text: "Buy Price",
          },
        },
      ];
      return {
        ...state,
        transactions,
        annotation,
      };
    }

    case "SELL":
      const transactions = {
        ...state.transactions,
        sell: [...state.transactions.sell, action.sellPrice],
      };
      const cash =
        state.cash *
        (action.sellPrice / transactions.buy[transactions.buy.length - 1]);
      return {
        ...state,
        transactions,
        annotation: [],
        cash,
      };

    case "INCREASE POSITION":
      if (state.position + 10 >= state.cash) {
        return {
          ...state,
          position: state.cash,
        };
      }
      return {
        ...state,
        position: state.position + 10,
      };
    case "DECREASE POSITION":
      if (state.position - 10 <= 0) {
        return {
          ...state,
          position: 0,
        };
      }
      return {
        ...state,
        position: state.position - 10,
      };

    default:
      return;
  }
};

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
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default App;
