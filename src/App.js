import "./App.scss";
import { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";
import ApexChart from "apexcharts";

const getNextDay = (date, day) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + day);
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

function App() {
  const [cash, setCash] = useState(1000);
  const [series, setSeries] = useState(generateData);
  let price;

  // Every 2 seconds, append to data
  useEffect(() => {
    setInterval(() => {
      setSeries((oldData) => {
        price = Math.abs(
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
    }, 1000);
  }, []);

  return (
    <div>
      <nav>
        <h1>Trading portal</h1>
      </nav>
      <div className="app">
        <div className="main">
          <div className="graph">
            <Graph series={series} />
          </div>
          <Buttons
            setCash={setCash}
            cash={cash}
            price={price}
            series={series}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
