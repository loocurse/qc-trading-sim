import React from "react";
import { transactionObject } from "../reducer";

type TransactionsType = {
  transactions: {
    buy: transactionObject[];
    sell: transactionObject[];
  };
  className: string;
}
export default function Transactions({ transactions, className, ...props }: TransactionsType): JSX.Element {
  const allTransactions: transactionObject[] = [];
  for (let i = 0; i < transactions.buy.length; i++) {
    allTransactions.push(transactions.buy[i]);
    if (i <= transactions.sell.length - 1)
      allTransactions.push(transactions.sell[i]);
  }

  const calculatePnL = (position: number, price: number, idx: number) => {
    const PnL = +(position * (price / allTransactions[idx - 1].price)).toFixed(
      2
    );
    const percentage = Math.round(((PnL - position) / position) * 100);
    return (
      <>
        <p className="block">{PnL}</p>
        <p
          className={`text-xs ${
            percentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {percentage >= 0 ? "+" : ""}
          {percentage}%
        </p>
      </>
    );
  };

  return (
    <div
      className={`col-span-full overflow-y-auto max-h-80 ${className}`}
      {...props}
    >
      <table className="w-full border-collapse">
        <colgroup>
          <col style={{ width: "25%" }}></col>
          <col style={{ width: "15%" }}></col>
          <col style={{ width: "20%" }}></col>
          <col style={{ width: "15%" }}></col>
          <col style={{ width: "25%" }}></col>
        </colgroup>
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-3 pl-6 text-left">Date</th>
            <th className="py-3 text-center">Operation </th>
            <th className="py-3 pr-4 text-right">Position</th>
            <th className="py-3 pr-4 text-right">Price</th>
            <th className="py-3 pr-6 text-right">Realized PnL</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions.map(({ date, price, position }, idx) => {
            return (
              <tr
                className={`border-b border-gray-200 ${
                  idx % 2 !== 0 ? "bg-gray-100" : ""
                }`}
                key={idx}
              >
                <td className="py-5 pl-6 text-left">
                  {date.toLocaleDateString()}
                </td>
                <td className="py-1 text-center">
                  <span
                    className={`${
                      idx % 2 === 0
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    } rounded-full py-1 px-4 font-semibold`}
                  >
                    {idx % 2 === 0 ? "BUY" : "SELL"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">{position && position.toFixed(2)}</td>
                <td className="py-3 pr-4 text-right">{price.toFixed(2)}</td>
                <td className="py-3 pr-6 text-right">
                  {idx % 2 === 0 ? "open" : position && calculatePnL(position, price, idx)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
