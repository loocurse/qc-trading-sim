import React, { useState } from "react";
import InnerTable from "../components/InnerTable";
import ApexChartPerformance from "../components/ApexChartPerformance";

const performanceData = [
  { month: "July 2021", realized_pnl: 2.33, positions:[
    { ticker: "AAPL", buy: 100, sell: 150, pnl: 50, notes: "Reached target price" },
    { ticker: "TSLA", buy: 400, sell: 390, pnl: -4.20, notes: "Reached stop loss" },
  ] }, 
  { month: "June 2021", realized_pnl: 2.33, positions:[
    { ticker: "AAPL", buy: 100, sell: 150, pnl: 50, notes: "Reached target price" },
    { ticker: "TSLA", buy: 400, sell: 390, pnl: -4.20, notes: "Reached stop loss" },
    { ticker: "BABA", buy: 300, sell: 390, pnl: 14.20, notes: "Reached target price" },
  ] }, 
];


function Performance(): JSX.Element {
  const [performance, setPerformance] = useState(performanceData);
  const outerTableCols = ["Month", "Positions Closed","Realised PnL (%)", "Actions"];
  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Performance Overview</h1>
      <ApexChartPerformance />

      <table className="performance table-fixed w-full my-5">
        <thead>
          <tr>
            {outerTableCols.map(colname => {
              return <th key={colname} className="">{colname}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {performance.map(data => {
            return (<><tr key={data.month}>
              <td>{data.month}</td>
              <td>{data.positions.length}</td>
              <td>{data.realized_pnl}</td>
              <td>More Details</td>
            </tr>
            <tr>
              <td colSpan={4} className="content-center bg-white">
                <InnerTable positions={data.positions}/>
              </td>
            </tr>
            </>);
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Performance;

