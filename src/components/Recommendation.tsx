import React, { useState, useEffect } from "react";
import { instance } from "../api";
import { ticker } from "./Graph";

interface recommendationType {
  date: Date;
  ticker: string;
  entry_price: number;
  stop_loss: number;
  target_price: number;
  expected_profit: number;
}

function Recommendation({
  setSelectedTicker,
  tickerData,
}: {
  setSelectedTicker: React.Dispatch<React.SetStateAction<ticker | undefined>>;
  tickerData: ticker[];
}): JSX.Element {
  const [rec, setRec] = useState<recommendationType[]>([]);

  const fetchData = async () => {
    const res = await instance.get("recommendation");
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

  const formatDate = (param_date: Date) => {
    const date = new Date(param_date);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const clickHandler = (symbol: string) => {
    setSelectedTicker(
      tickerData.filter((ticker) => {
        return ticker.symbol === symbol;
      })[0]
    );
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
                <td className="content-center">{formatDate(rec.date)}</td>
                <td
                  className="font-bold cursor-pointer"
                  onClick={() => clickHandler(rec.ticker)}
                >
                  {rec.ticker}
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
