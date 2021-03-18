import React from "react";

export default function Transactions() {
  // TODO integrate data from other components
  // TODO Change table headers
  const data = [
    {
      date: "20 Nov 2021",
      operation: "BUY",
      quantity: 100,
      price: 5,
      money: 500,
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
    <div
      style={{
        gridColumn: "1/-1",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <colgroup>
          {Array(5)
            .fill()
            .map(() => (
              <col style={{ width: "20%" }}></col>
            ))}
        </colgroup>
        <thead>
          <tr
            style={{
              background: "#E5E7EB",
              color: "#4B5563",
            }}
          >
            <th style={{ padding: "12px 0px 12px 24px", textAlign: "left" }}>
              Date
            </th>
            <th style={{ padding: "12px 0px" }}>Operation</th>
            <th style={{ padding: "12px 16px 12px 0px", textAlign: "right" }}>
              Quantity
            </th>
            <th style={{ padding: "12px 16px 12px 0px", textAlign: "right" }}>
              Price
            </th>
            <th style={{ padding: "12px 24px 12px 0px", textAlign: "right" }}>
              Money
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ date, operation, quantity, price, money }, idx) => {
            return (
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  background: idx % 2 !== 0 ? "#F9FAFB" : "",
                }}
              >
                <td
                  style={{ padding: "12px 0px 12px 24px", textAlign: "left" }}
                >
                  {date}
                </td>
                <td style={{ textAlign: "center", padding: "4px 0px" }}>
                  <span
                    style={{
                      background: operation === "BUY" ? "#A7F3D0" : "#FECACA",
                      borderRadius: "9999px",
                      padding: "4px 16px",
                    }}
                  >
                    {operation}
                  </span>
                </td>
                <td
                  style={{ padding: "12px 16px 12px 0px", textAlign: "right" }}
                >
                  {quantity}
                </td>
                <td
                  style={{ padding: "12px 16px 12px 0px", textAlign: "right" }}
                >
                  {price}
                </td>
                <td
                  style={{ padding: "12px 24px 12px 0px", textAlign: "right" }}
                >
                  {money}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
