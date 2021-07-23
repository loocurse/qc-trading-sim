import axios from "axios";
import credentials from "./credentials.json";

export interface TickerResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: Result[];
  status: string;
  request_id: string;
  count: number;
}
export interface Result {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export const instance = axios.create({
  baseURL: "http://localhost:2000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getTickerPriceData = async (
  ticker: string,
  resolution: string
): Promise<Result[]> => {
  const today = new Date().getTime();
  const day = 86400000;
  let startDate: number; // unixtime in millisecond
  let range: string;
  switch (resolution) {
    case "1D":
      startDate = today - day;
      range = "30/minute";
      break;
    case "5D":
      startDate = today - day * 5;
      range = "1/hour";
      break;
    case "1M":
      startDate = today - day * 30;
      range = "1/day";
      break;
    case "3M":
      startDate = today - day * 30 * 3;
      range = "3/day";
      break;
    case "6M":
      startDate = today - day * 30 * 6;
      range = "6/day";
      break;
    case "YTD":
      startDate = Date.parse(`01 Jan ${new Date().getFullYear()} 00:00:00 GMT`);
      range = "10/day";
      break;
    case "1Y":
      startDate = today - day * 365;
      range = "10/day";
      break;
    case "5Y":
      startDate = today - day * 365 * 5;
      range = "1/month";
      break;
    case "ALL":
      startDate = 0;
      range = "3/month";
      break;
    default:
      startDate = today;
      range = "3/month";
  }

  const res = await axios.get<TickerResponse>(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${range}/${startDate}/${today}?adjusted=true&sort=desc&limit=50000&apiKey=${credentials.API_KEY}`
  );
  return res.data.results;
};

export const getIndex = async (): Promise<Result[]> => {
  const date = new Date();
  const res = await axios.get<TickerResponse>(
    `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${
      date.getTime() - 9777600000
    }/${date.getTime()}?adjusted=true&sort=asc&apiKey=${credentials.API_KEY}`
  );
  return res.data.results;
};

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

export const getStatus = async (): Promise<boolean> => {
  const res = await axios.get<MarketStatus>(
    `https://api.polygon.io/v1/marketstatus/now?&apiKey=${credentials.API_KEY}`
  );
  console.log(res.data.market);
  return res.data.market === "open";
};

export const getTickerLatestPrice = async (ticker: string): Promise<number> => {
  const res = await axios.get(
    `https://api.polygon.io/v2/last/trade/${ticker}?&apiKey=${credentials.API_KEY}`
  );
  return res.data.results.p;
};
