import React, { useState, useEffect } from "react";
import { heroku } from "../../api";
import { RecommendationsGet } from "../../utils/api.interface";
import { ticker } from "../../utils/ticker.interface";
import { Action } from "../../utils/tickerReducer";

interface recommendationType {
  symbol: string;
  target_price: number;
  entry_price: number;
  open_timestamp: number;
  stop_loss: number;
  expected_profit: number;
}

interface RecommendationProps {
  dispatch: React.Dispatch<Action>;
  tickerData: ticker[];
}

function Recommendation({
  dispatch,
  tickerData,
}: RecommendationProps): JSX.Element {
  const [rec, setRec] = useState<recommendationType[]>([]);

  const fetchData = async () => {
    const res = await heroku.get<RecommendationsGet>(
      "recommendations?limit=10"
    );
    setRec(res.data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnNames = [
    "Date",
    "Ticker",
    "Entry Price",
    "Stop Loss",
    "Target Price",
    "Profit",
  ];

  const formatDate = (open_timestamp: number, time = false) => {
    const date = new Date(open_timestamp * 1000);
    if (time) {
      let hours = date.getHours() + 1;
      const minutes = 0;
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const string_minutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + string_minutes + " " + ampm;
      return strTime;
    }
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const clickHandler = (symbol: string) => {
    dispatch({
      type: "UPDATE_SELECTED_TICKER",
      ticker: tickerData.filter((ticker) => {
        return ticker.symbol === symbol;
      })[0],
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-10">Recommendations</h2>
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            {columnNames.map((name) => {
              return (
                <th key={name} className="w-1/6">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rec.map((rec, idx) => {
            return (
              <tr key={idx}>
                <td className="content-center text-sm">
                  <div>
                    <p>{formatDate(rec.open_timestamp)}</p>
                    <p>{formatDate(rec.open_timestamp, true)}</p>
                  </div>
                </td>
                <td
                  className="font-bold cursor-pointer"
                  onClick={() => clickHandler(rec.symbol)}>
                  {rec.symbol}
                </td>
                <td>${rec.entry_price.toFixed(2)}</td>
                <td>${rec.stop_loss.toFixed(2)}</td>
                <td>${rec.target_price.toFixed(2)}</td>
                <td>{rec.expected_profit.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Recommendation;
