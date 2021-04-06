import React from "react";

export default function Transactions({ transactions, className, ...props }) {
  // TODO integrate data from other components
  // TODO Change table headers
  const data = [
    {
      date: "20 Nov 2021",
      operation: "BUY",
      quantity: 100,
      price: 5,
      money: "Open",
    },
    {
      date: "21 Nov 2021",
      operation: "SELL",
      quantity: 100,
      price: 5,
      money: 1000,
    },
  ];
  return (
    <div className={`col-span-full ${className}`} {...props}>
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
          {data.map(({ date, operation, quantity, price, money }, idx) => {
            return (
              <tr
                className={`border-b border-gray-200 ${
                  idx % 2 !== 0 ? "bg-gray-100" : ""
                }`}
                key={idx}
              >
                <td className="py-3 pl-6 text-left">{date}</td>
                <td className="py-1 text-center">
                  <span
                    className={`${
                      operation === "BUY" ? "bg-green-200" : "bg-red-200"
                    } rounded-full py-1 px-4`}
                  >
                    {operation}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">{quantity}</td>
                <td className="py-3 pr-4 text-right">{price}</td>
                <td className="py-3 pr-6 text-right">{money}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
