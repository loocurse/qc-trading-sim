import React from "react";
import { ticker } from "./Graph";

type tickerListProps = {
	tickerList: ticker[];
}

const TickerList = ({ tickerList }: tickerListProps): JSX.Element => {
  return (
    <div className="dropdown absolute bg-white rounded-lg w-full">
      { tickerList.map((data) => {
        if (data) {
          return (
            <div className= "p-3 hover:bg-gray-100 cursor-pointer w-full" key={data.name}>
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