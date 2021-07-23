import { Market } from "./ticker.interface";

export interface Tickerlist {
  tickerlist: TickerlistElement[];
}

export interface TickerlistElement {
  name: string;
  exchange: Market;
  symbol: string;
  change: number;
  change_perc: number;
}

export interface Recommendations {
  symbol: string;
  target_price: number;
  entry_price: number;
  open_timestamp: number;
  stop_loss: number;
  expected_profit: number;
}

export interface Performance {
  performance: PerformanceElement[];
}

export interface PerformanceElement {
  month: number;
  realized_pnl: number;
  positions: Position[];
}

export interface Position {
  symbol: string;
  target_price: number;
  entry_price: number;
  open_timestamp: number;
  stop_loss: number;
  pnl: number;
  notes: string;
  close_timestamp: number;
}

// For getting ticker price data
export interface TickerResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: TickerResponseResult[];
  status: string;
  request_id: string;
  count: number;
}
export interface TickerResponseResult {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

// For market status

export interface MarketStatus {
  market: string;
  earlyHours: boolean;
  afterHours: boolean;
  serverTime: string;
  exchanges: Exchanges;
  currencies: Currencies;
}

export interface Currencies {
  fx: string;
  crypto: string;
}

export interface Exchanges {
  nyse: string;
  nasdaq: string;
  otc: string;
}
