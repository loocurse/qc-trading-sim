import { useEffect, useReducer, useState } from "react";
import SearchBar from "../components/SearchBar";
import TickerList from "../components/TickerList";
import ApexChart from "../components/ApexChart";
import { heroku, getStatus, getTickerLatestPrice } from "../api";
import Recommendation from "../components/Recommendation";
import { tickerReducer as reducer, initialState } from "../utils/tickerReducer";
import { Tickerlist } from "../utils/api.interface";

function Overview(): JSX.Element {
  const [{ tickerData, selectedTicker, tickerList }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [status, setStatus] = useState<boolean>();

  const filterList = (query: string) => {
    if (query && tickerData) {
      const filteredData = tickerData.filter((data) => {
        const symbol = data.symbol.toLowerCase();
        const name = data.name.toLowerCase();
        return symbol.includes(query) || name.includes(query);
      });
      dispatch({ type: "UPDATE_LIST", list: filteredData.slice(0, 4) });
    } else {
      dispatch({
        type: "UPDATE_LIST",
        list: tickerData.slice(0, 4),
      });
    }
  };

  // Fetch ticker data from API. Using anonymous function because there's some typescript error with useEffect async
  useEffect(() => {
    const fetchData = async () => {
      const result = await heroku.get<Tickerlist>("tickerlist");
      const promises = result.data.tickerlist.map((item, id) => {
        return getTickerLatestPrice(item.symbol).then((price) => {
          return { ...item, price, id };
        });
      });
      Promise.all(promises).then((results) => {
        dispatch({ type: "GET_DATA", data: results });
      });
    };

    const getMarketStatus = async () => {
      const result = await getStatus();
      setStatus(result);
    };
    fetchData();
    getMarketStatus();
  }, []);

  if (selectedTicker && tickerData && tickerList) {
    return (
      <div>
        <div className="flex items-center mt-5 mb-2">
          <svg height="10" width="10" className="mr-2 my-2">
            <circle cx="5" cy="5" r="5" fill={status ? "green" : "red"} />
          </svg>
          <p>Market {status ? "Open" : "Closed"}</p>
        </div>
        <h2 className="text-3xl font-bold">
          {selectedTicker.symbol} ({selectedTicker.exchange})
        </h2>
        <div className="flex justify-between mt-1">
          <div className="flex items-baseline font-bold">
            <h2 className="mr-2 text-xl ">{selectedTicker.price}</h2>
            <p className="text-gray-400 ml-2">
              {selectedTicker.change} (
              {(selectedTicker.change_perc * 100).toFixed(2)}%)
            </p>
          </div>
          <div className="relative">
            <SearchBar filterList={filterList} />
            <TickerList
              tickerData={tickerData}
              tickerList={tickerList}
              dispatch={dispatch}
            />
          </div>
        </div>
        <ApexChart ticker={selectedTicker.symbol} />
        <Recommendation dispatch={dispatch} tickerData={tickerData} />
      </div>
    );
  }
  return <div></div>;
}

export default Overview;
