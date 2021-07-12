import React from "react";
import { ticker } from "./Graph";

type tickerListProps = {
  tickerData: ticker[];
	tickerList: ticker[];
  setSelectedTicker: React.Dispatch<React.SetStateAction<ticker>>;
}

const TickerList = ({ tickerList, setSelectedTicker, tickerData }: tickerListProps): JSX.Element => {

  const clickHandler = (id: number) => {
    const ticker = tickerData.filter(data => data.id === id)[0];
    setSelectedTicker(ticker);
  };

  return (
    <div className="dropdown absolute bg-white rounded-lg w-full">
      { tickerList.map((data) => {
        if (data) {
          return (
            <div onClick={() => clickHandler(data.id)} className= "p-3 hover:bg-gray-100 cursor-pointer w-full" key={data.name}>
              <h1 className="text-lg font-bold">{data.symbol}</h1>
              <p className="text-sm">{data.name}</p>
            </div>	
          );	
        }
        return null;
      }) }
    </div>
  );
};

export default TickerList;