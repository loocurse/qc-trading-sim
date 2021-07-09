import React from "react";

interface innerTableProps {
  positions: {
    ticker: string;
    buy: number;
    sell: number;
    pnl: number;
    notes: string;
  }[]
}

function InnerTable({ positions }: innerTableProps): JSX.Element {
  const innerTableCols = ["Ticker","Buy Price","Sell Price", "PnL (%)", "Notes"];
  return (
    <table className="inner-table w-5/6 m-auto content-center">
      <thead>
        <tr>
          {innerTableCols.map(colname => {
            return <th key={colname} className="">{colname}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {positions.map(data => {
          return (
            <tr key={data.ticker}>
              <td>{data.ticker}</td>
              <td>{data.buy}</td>
              <td>{data.sell}</td>
              <td>{data.pnl}</td>
              <td>{data.notes}</td>
            </tr>
          );
        })}
        
      </tbody>
    </table>
  );
}

export default InnerTable;
