import { ticker } from "../ticker.interface";

export type Action =
  | { type: "GET_DATA"; data: ticker[] }
  | { type: "UPDATE_LIST"; list: ticker[] }
  | { type: "UPDATE_SELECTED_TICKER"; ticker: ticker };

interface reducerState {
  tickerData: ticker[];
  selectedTicker: ticker;
  tickerList: ticker[];
}

export const initialState = {
  tickerData: [] as ticker[],
  selectedTicker: null as unknown as ticker,
  tickerList: [] as ticker[],
};

export const reducer = function (
  state: reducerState,
  action: Action
): reducerState {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        tickerData: action.data,
        selectedTicker: action.data[0],
        tickerList: action.data.slice(0, 4),
      };
    case "UPDATE_LIST":
      return {
        ...state,
        tickerList: action.list,
      };
    case "UPDATE_SELECTED_TICKER":
      return {
        ...state,
        selectedTicker: action.ticker,
      };
  }
};
