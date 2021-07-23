import ClosePositionModal from "../components/ClosePositionModal";
import { ClosedPosition, OpenPosition, payload } from "./journal.interface";

interface State {
  openPosition: OpenPosition[];
  closedPosition: ClosedPosition[];
  addPositionModal: boolean;
  closePositionModal: boolean;
  currentTicker: payload;
}

export type Action =
  | { type: "SET_OPEN_POSITIONS"; data: OpenPosition[] }
  | { type: "SET_CLOSED_POSITIONS"; data: ClosedPosition[] }
  | { type: "ADD_OPEN_POSITION"; data: OpenPosition }
  | { type: "TOGGLE_ADD_POSITION_MODAL" }
  | { type: "TOGGLE_CLOSE_POSITION_MODAL" }
  | { type: "CLOSE_POSITION"; data: payload }
  | { type: "SET_CURRENT_TICKER"; data: payload };

const calculateProfit = (buy: number, sell: number) => {
  return +((sell / buy - 1) * 100).toFixed(2);
};

export const initialState: State = {
  openPosition: [] as OpenPosition[],
  closedPosition: [] as ClosedPosition[],
  addPositionModal: false,
  closePositionModal: false,
  currentTicker: {
    buy_price: 0,
    close_date: "",
    open_date: "",
    sell_price: 0,
    ticker: "",
  },
};

export const journalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_OPEN_POSITIONS":
      return { ...state, openPosition: action.data };
    case "SET_CLOSED_POSITIONS":
      return { ...state, closedPosition: action.data };
    case "TOGGLE_ADD_POSITION_MODAL":
      return { ...state, addPositionModal: !state.addPositionModal };
    case "TOGGLE_CLOSE_POSITION_MODAL":
      return { ...state, closePositionModal: !state.closePositionModal };
    case "ADD_OPEN_POSITION":
      const newPosition = {
        ...action.data,
        profit: calculateProfit(
          action.data.entry_price,
          action.data.current_price
        ),
      };
      return { ...state, openPosition: [...state.openPosition, newPosition] };
    case "CLOSE_POSITION":
      const openPosition = state.openPosition.filter((item) => {
        return item.entry_price !== action.data.buy_price;
      });
      const closedPosition = [
        ...state.closedPosition,
        {
          close_date: action.data.close_date,
          entry_price: action.data.buy_price,
          ticker: action.data.ticker,
          close_price: action.data.sell_price,
          open_date: action.data.open_date,
          profit: calculateProfit(
            action.data.buy_price,
            action.data.sell_price
          ),
        },
      ];
      return { ...state, openPosition, closedPosition };
    case "SET_CURRENT_TICKER":
      return { ...state, currentTicker: action.data };
  }
};
