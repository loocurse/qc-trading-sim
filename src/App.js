import "./App.scss";
import { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import Graph from "./components/Graph";

function App() {
  let time = 11;
  const [data, setData] = useState({
    xaxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    yaxis: [10, 15, 13, 12, 10, 14, 9, 7, 6, 7, 10],
  });

  useEffect(() => {
    setInterval(() => {
      let x_axis = data.xaxis;
      let y_axis = data.yaxis;
      x_axis.push(time);
      y_axis.push(Math.floor(Math.random() * 10 + 5));
      x_axis.shift();
      y_axis.shift();
      time++;
      setData({ xaxis: x_axis, yaxis: y_axis });
      console.log(data);
    }, 2000);
  }, []);

  return (
    <div className="app">
      <nav>
        <h1>Trading portal</h1>
      </nav>
      <div className="main">
        <div className="graph">
          <Graph graphData={data} />
        </div>
        <Buttons />
      </div>
    </div>
  );
}

export default App;
