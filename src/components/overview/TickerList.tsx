import { ticker } from "../../utils/ticker.interface";
import { Action } from "../../utils/tickerReducer";

type tickerListProps = {
  tickerData: ticker[];
  tickerList: ticker[];
  dispatch: React.Dispatch<Action>;
};

const TickerList = ({
  tickerList,
  dispatch,
  tickerData,
}: tickerListProps): JSX.Element => {
  const clickHandler = (id: number) => {
    const ticker = tickerData.filter((data) => data.id === id)[0];
    dispatch({ type: "UPDATE_SELECTED_TICKER", ticker: ticker });
  };

  return (
    <div className="dropdown absolute bg-white rounded-lg w-full">
      {tickerList.map((data) => {
        if (data) {
          return (
            <div
              onClick={() => clickHandler(data.id)}
              className="p-3 hover:bg-gray-100 cursor-pointer w-full"
              key={data.name}>
              <h1 className="text-lg font-bold">{data.symbol}</h1>
              <p className="text-sm">{data.name}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TickerList;
