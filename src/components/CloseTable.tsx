import { instance } from "../api";
import { useEffect } from "react";
import { dateFormatter } from "./OpenTable";
import { Action } from "../utils/journalReducer";
import { ClosedPosition } from "../utils/journal.interface";

interface CloseTableProps {
  closedPosition: ClosedPosition[] | undefined;
  dispatch: React.Dispatch<Action>;
}

function CloseTable({
  closedPosition,
  dispatch,
}: CloseTableProps): JSX.Element {
  useEffect(() => {
    const getPositions = async () => {
      const res = await instance.get<ClosedPosition[]>("closedPositions");
      const newArray = res.data.map((item) => {
        return {
          ...item,
          profit: +((item.close_price / item.entry_price - 1) * 100).toFixed(2),
        };
      });
      dispatch({ type: "SET_CLOSED_POSITIONS", data: newArray });
    };
    getPositions();
  }, []);

  const deleteHandler = (entry_price: number) => {
    if (closedPosition) {
      const newClosePos = closedPosition.filter((item) => {
        return item.entry_price !== entry_price;
      });
      dispatch({ type: "SET_CLOSED_POSITIONS", data: newClosePos });
    }
  };

  const tableColumns = [
    "Ticker",
    "Open Date",
    "Close Date",
    "Entry Price",
    "Sell Price",
    "Profits (%)",
    "Actions",
  ];
  return (
    <div>
      <table className="table-auto w-full table">
        <thead>
          <tr>
            {tableColumns.map((item) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {closedPosition &&
            closedPosition.map((item) => {
              return (
                <tr key={item.open_date}>
                  <td>{item.ticker}</td>
                  <td>{dateFormatter(item.open_date)}</td>
                  <td>{dateFormatter(item.close_date)}</td>
                  <td>${item.entry_price}</td>
                  <td>${item.close_price}</td>
                  <td
                    className={
                      item.profit && item.profit > 0
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }>
                    {item.profit}%
                  </td>
                  <td>
                    <button onClick={() => deleteHandler(item.entry_price)} className="bg-red-500 p-1 px-3 rounded-lg text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CloseTable;
