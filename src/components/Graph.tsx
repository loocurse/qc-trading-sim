import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TickerList from "./TickerList";

const defaultTickerData = [
  { id:1, symbol: "BABA", market:"NYSE", name: "Alibaba Group Holding Ltd" },
  { id:2, symbol: "LMND", market:"NYSE", name: "Lemonade Inc" },
  { id:3, symbol: "AAPL", market:"NASDAQ", name: "Apple Inc" },
  { id:4, symbol: "TSLA", market:"NASDAQ", name: "Tesla Inc" },
  { id:5, symbol: "GME", market:"NYSE", name: "GameStop Corp." },
  { id:6, symbol: "AMC", market:"NYSE", name: "AMC Entertainment Holdings Inc" },
  { id:7, symbol: "PLTR", market:"NYSE", name: "Palantir Technologies Inc" },
];

export type ticker = {
	symbol: string;
	market: string;
	name: string;
  id: number;
}

function Graph(): JSX.Element {
  const [tickerData, setTickerData] = useState(defaultTickerData);
  const [tickerList, setTickerList] = useState<ticker[]>(tickerData.slice(0,4));
  const [selectedTicker, setSelectedTicker] = useState<ticker>(tickerData[0]);

  const filterList = (query: string) => {
    if (query) {
      const filteredData = tickerData.filter(data => {
        const symbol = data.symbol.toLowerCase();
        const name = data.name.toLowerCase();
        return symbol.includes(query) || name.includes(query);
      });
      setTickerList(filteredData.slice(0,4));
    } else {
      setTickerList(tickerData.slice(0,4));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">{selectedTicker.symbol} ({selectedTicker.market})</h2>
      <div className="flex justify-between mt-1">
        <div className="flex items-baseline font-bold">
          <h2 className="mr-2 text-xl ">217.20</h2>
          <p className="text-gray-400 ml-2">2.39   (-1.09%)</p>
        </div>
        <div className="relative">
          <SearchBar filterList={filterList} />
          <TickerList tickerData={tickerData} tickerList={tickerList} setSelectedTicker={setSelectedTicker} />
        </div>
      </div>
    </div>
  );
}

export default Graph;
