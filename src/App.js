import "./App.scss";
import { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";
import ApexChart from "apexcharts";

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
}; // [{x: day 1, y: price}, {x: day2, y: price}, ...]
function App() {
  const [cash, setCash] = useState(0);

  // data and time are variables used in the graph
  // let time = 11;
  // const [data, setData] = useState({
  //   xaxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //   yaxis: [10, 15, 13, 12, 10, 14, 9, 7, 6, 7, 10],
  // });
  const [series, setSeries] = useState(generateData);

  // Every 2 seconds, append to data
  useEffect(() => {
    setInterval(() => {
      setSeries((oldData) => {
        const newDataPoint = {
          x: getNextDay(oldData[oldData.length - 1].x, 1),
          y: Math.floor(Math.random() * 10 + 5),
        };
        const newData = oldData.slice();
        // TODO Memory Leak issue
        // Array size will grow linearly without limits, probably need to find
        // a way to resize the array once in a while.
        // https://github.com/apexcharts/react-apexcharts/issues/132
        newData.push(newDataPoint);
        return newData;
      });
    }, 2000);
  }, []);

  return (
    <div>
      <nav>
        <h1>Trading portal</h1>
      </nav>
      <div className="app">
        <div className="main">
          <div className="graph">
            <Graph graphData={series} />
          </div>
          <Buttons cash={cash} />
        </div>
      </div>
    </div>
  );
}

export default App;
