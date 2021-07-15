import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TickerList from "./TickerList";
import ApexChart from "./ApexChart";
import { instance } from "../api";


export interface ticker {
  id:            number;
  name:          string;
  price:         number;
  symbol:        string;
  change_number: number;
  change_per:    number;
  market:        Market;
}

export enum Market {
  Nasdaq = "NASDAQ",
  Nyse = "NYSE",
}


function Graph(): JSX.Element {
  const [tickerData, setTickerData] = useState<ticker[]>([]);
  const [tickerList, setTickerList] = useState<ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<ticker>();

  const filterList = (query: string) => {
    if (query && tickerData) {
      const filteredData = tickerData.filter(data => {
        const symbol = data.symbol.toLowerCase();
        const name = data.name.toLowerCase();
        return symbol.includes(query) || name.includes(query);
      });
      setTickerList(filteredData.slice(0,4));
    } else {
      tickerData && setTickerList(tickerData.slice(0,4));
    }
  };

  // Fetch ticker data from API. Using anonymous function because there's some typescript error with useEffect async
  useEffect(() => {
    const fetchData = async () => {
      const result = await instance.get("ticker");
      setTickerData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    tickerData && setTickerList(tickerData.slice(0,4));
    tickerData && setSelectedTicker(tickerData[0]);
  }, [tickerData]);

  if (selectedTicker && tickerData && tickerList) {
    return (
      <div>
        <h2 className="text-3xl font-bold">{selectedTicker.symbol} ({selectedTicker.market})</h2>
        <div className="flex justify-between mt-1">
          <div className="flex items-baseline font-bold">
            <h2 className="mr-2 text-xl ">{selectedTicker.price}</h2>
            <p className="text-gray-400 ml-2">{selectedTicker.change_number}    ({(selectedTicker.change_per*100).toFixed(2)}%)</p>
          </div>
          <div className="relative">
            <SearchBar filterList={filterList} />
            <TickerList tickerData={tickerData} tickerList={tickerList} setSelectedTicker={setSelectedTicker} />
          </div>
        </div>
        <ApexChart ticker={selectedTicker.symbol} />
      </div>
    );
  }
  return (<div></div>);

  
}

export default Graph;

