import { useEffect, useReducer } from "react";
import SearchBar from "../components/SearchBar";
import TickerList from "../components/TickerList";
import ApexChart from "../components/ApexChart";
import { instance } from "../api";
import Recommendation from "../components/Recommendation";
import { reducer, initialState } from "../utils/reducer";

function Overview(): JSX.Element {
  const [{ tickerData, selectedTicker, tickerList }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
      const result = await instance.get("ticker");
      dispatch({ type: "GET_DATA", data: result.data });
    };
    fetchData();
  }, []);

  if (selectedTicker && tickerData && tickerList) {
    return (
      <div>
        <h3 className="my-5 text-xl">Welcome, Lucas</h3>
        <h2 className="text-3xl font-bold">
          {selectedTicker.symbol} ({selectedTicker.market})
        </h2>
        <div className="flex justify-between mt-1">
          <div className="flex items-baseline font-bold">
            <h2 className="mr-2 text-xl ">{selectedTicker.price}</h2>
            <p className="text-gray-400 ml-2">
              {selectedTicker.change_number} (
              {(selectedTicker.change_per * 100).toFixed(2)}%)
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
