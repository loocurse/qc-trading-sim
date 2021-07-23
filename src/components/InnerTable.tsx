import { Position } from "../utils/api.interface";

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
        {positions.map((data) => {
          return (
            <tr key={data.symbol}>
              <td>{data.symbol}</td>
              <td>{data.entry_price}</td>
              <td>{data.target_price}</td>
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
