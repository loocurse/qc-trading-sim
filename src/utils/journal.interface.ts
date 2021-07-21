export interface OpenPosition {
  datetime: string;
  ticker: string;
  entry_price: number;
  current_price: number;
  profit?: number;
}

export interface ClosedPosition {
  open_date: string;
  close_date: string;
  ticker: string;
  entry_price: number;
  close_price: number;
  profit?: number;
}

export interface payload {
  sell_price: number;
  open_date: string;
  close_date: string;
  ticker: string;
  buy_price: number;
}