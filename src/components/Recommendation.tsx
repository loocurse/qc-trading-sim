import React, { useState, useEffect } from "react";
import { heroku } from "../api";
import { Recommendations } from "../utils/api.interface";
import { ticker } from "../utils/ticker.interface";
import { Action } from "../utils/tickerReducer";

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
    const res = await heroku.get<Recommendations[]>("recommendations?limit=10");
    setRec(res.data);
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

  const formatDate = (open_timestamp: number) => {
    const date = new Date(open_timestamp);
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
                <td className="content-center">
                  {formatDate(rec.open_timestamp)}
                </td>
                <td
                  className="font-bold cursor-pointer"
                  onClick={() => clickHandler(rec.symbol)}>
                  {rec.symbol}
                </td>
                <td>${rec.entry_price}</td>
                <td>${rec.stop_loss}</td>
                <td>${rec.target_price}</td>
                <td>{rec.expected_profit}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Recommendation;
