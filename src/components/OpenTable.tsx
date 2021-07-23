import { OpenPosition } from "../utils/journal.interface";
import { Action } from "../utils/journalReducer";

export const dateFormatter = (date_string: string): string => {
  const date = new Date(date_string);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

interface OpenTableProps {
  openPosition: OpenPosition[] | undefined;
  dispatch: React.Dispatch<Action>;
}

function OpenTable({ openPosition, dispatch }: OpenTableProps): JSX.Element {
  // When close button is clicked, this handler handles bringing up the modal and passing corresponding information
  const closePositionHandler = (position: OpenPosition) => {
    dispatch({ type: "TOGGLE_CLOSE_POSITION_MODAL" });
    dispatch({
      type: "SET_CURRENT_TICKER",
      data: {
        sell_price: position.current_price,
        buy_price: position.entry_price,
        close_date: new Date().toISOString(),
        open_date: position.datetime,
        ticker: position.ticker,
      },
    });
  };

  const tableColumns = [
    "Date",
    "Ticker",
    "Entry Price",
    "Current Price",
    "Unrealised Profits (%)",
    "Actions",
  ];
  if (openPosition) {
    return (
      <div>
        <div className="flex justify-between items-end">
          <div className="flex items-center mt-10">
            <h2 className="text-2xl font-bold">Open positions</h2>
            <svg className="ml-3" height="10" width="10">
              <circle fill="green" stroke="none" cx="5" cy="5" r="5">
                <animate
                  attributeName="opacity"
                  dur="1.5s"
                  values="0;1;1;0"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
            </svg>
          </div>
          <button
            onClick={() => dispatch({ type: "TOGGLE_ADD_POSITION_MODAL" })}
            className="bg-green-300 px-3 py-2 rounded-xl ml-4 uppercase font-bold">
            Add Position
          </button>
        </div>

        <table className="table-auto w-full table">
          <thead>
            <tr>
              {tableColumns.map((item) => {
                return <th key={item}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {openPosition.map((item) => {
              return (
                <tr key={item.datetime}>
                  <td>{dateFormatter(item.datetime)}</td>
                  <td>{item.ticker}</td>
                  <td>${item.entry_price}</td>
                  <td>${item.current_price}</td>
                  <td
                    className={
                      item.profit && item.profit > 0
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }>
                    {item.profit}%
                  </td>
                  <td>
                    <button
                      onClick={() => closePositionHandler(item)}
                      className="bg-red-500 p-1 px-3 rounded-lg text-white">
                      Close Position
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
  return (
    <div className="spinner my-10">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}

export default OpenTable;
