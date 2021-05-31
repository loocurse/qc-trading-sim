import React from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Action, ActionTypes } from "../reducer";

type GraphProps = {
  series: {x: Date, y: number}[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  annotation: any[];
  dispatch: React.Dispatch<Action>;
  ticker: string;
}

function Graph({ series, annotation, dispatch, ticker }: GraphProps): JSX.Element {
  const tickerHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const target = event.target as Element;
    dispatch({ type: ActionTypes.changeTicker, ticker: target.innerHTML });
  };
  return (
    <div>
      <div className="mt-5 dropdown">
        <button>
          {ticker} <FontAwesomeIcon icon={faCaretDown} />
        </button>
        <div className="dropdown-content">
          <p onClick={tickerHandler}>NASDAQ: AAPL</p>
          <p onClick={tickerHandler}>NASDAQ: GOOG</p>
          <p onClick={tickerHandler}>NASDAQ: ABNB</p>
          <p onClick={tickerHandler}>NYSE: BABA</p>
        </div>
      </div>

      <Chart
        options={{
          chart: {
            toolbar: {
              show: false,
            },
            id: "basic-bar",
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 500,
              },
            },
            type: "line",
          },
          annotations: {
            // I wanted an annotation to indicate when the time that the user 'buy', but annotation is jerky and cannot be animated: https://github.com/apexcharts/apexcharts.js/issues/826
            yaxis: [...annotation],
          },
          xaxis: {
            // range: X_AXIS_RANGE,
            type: "datetime",
            min: new Date("4/7/20").getTime(),
            max: new Date("4/6/21").getTime(),
          },
          yaxis: {
            // max: 320,
            // min: 180,
            labels: {
              formatter: (val: number) => {
                return val.toFixed(0);
              },
            },
            title: {
              text: "Price",
            },
          },
          stroke: { curve: "smooth", width: 3 },
        }}
        series={[
          {
            name: "BABA",
            data: series.slice(),
          },
        ]}
        width="700"
      />
    </div>
  );
}

export default Graph;
