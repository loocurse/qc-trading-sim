import React from "react";

export default function Transactions({ transactions, className, ...props }) {
  // TODO integrate data from other components
  // TODO Change table headers
  const allTransactions = [];
  for (let i = 0; i < transactions.buy.length; i++) {
    allTransactions.push(transactions.buy[i]);
    if (i <= transactions.sell.length - 1)
      allTransactions.push(transactions.sell[i]);
  }
  return (
    <div
      className={`col-span-full overflow-y-auto max-h-80 ${className}`}
      {...props}
    >
      <table className="w-full border-collapse">
        <colgroup>
          {Array(5)
            .fill()
            .map((_, idx) => (
              <col style={{ width: "20%" }} key={idx}></col>
            ))}
        </colgroup>
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-3 pl-6 text-left">Settle Date</th>
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
                <td className="py-3 pl-6 text-left">
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
                <td className="py-3 pr-4 text-right">{position.toFixed(2)}</td>
                <td className="py-3 pr-4 text-right">{price.toFixed(2)}</td>
                <td className="py-3 pr-6 text-right">
                  {idx % 2 === 0
                    ? "open"
                    : (
                        position *
                        (price / allTransactions[idx - 1].price)
                      ).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
