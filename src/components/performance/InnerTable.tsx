import { Position } from "../../utils/api.interface";

function InnerTable({ positions }: { positions: Position[] }): JSX.Element {
  const innerTableCols = [
    "Ticker",
    "Buy Price",
    "Sell Price",
    "PnL (%)",
    "Notes",
  ];
  return (
    <table className="inner-table w-5/6 m-auto content-center">
      <thead>
        <tr>
          {innerTableCols.map((colname) => {
            return (
              <th key={colname} className="">
                {colname}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {positions.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.symbol}</td>
              <td>${data.entry_price.toFixed(2)}</td>
              <td>${data.target_price.toFixed(2)}</td>
              <td>{data.pnl.toFixed(2)}%</td>
              <td>{data.notes}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default InnerTable;
