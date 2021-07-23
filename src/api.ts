import axios from "axios";
//import credentials from "./credentials.json";
import {
  TickerResponse,
  TickerResponseResult,
  MarketStatus,
} from "./utils/api.interface";

const API_KEY = process.env.REACT_APP_API_KEY;

export const heroku = axios.create({
  baseURL: "https://quantcrunch-api.herokuapp.com/api/",
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getTickerPriceData = async (
  ticker: string,
  resolution: string
): Promise<TickerResponseResult[]> => {
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
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${range}/${startDate}/${today}?adjusted=true&sort=desc&limit=50000&apiKey=${API_KEY}`
  );
  return res.data.results;
};

export const getIndex = async (): Promise<TickerResponseResult[]> => {
  const date = new Date();
  const res = await axios.get<TickerResponse>(
    `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${
      date.getTime() - 9777600000
    }/${date.getTime()}?adjusted=true&sort=asc&apiKey=${API_KEY}`
  );
  return res.data.results;
};

export const getStatus = async (): Promise<boolean> => {
  const res = await axios.get<MarketStatus>(
    `https://api.polygon.io/v1/marketstatus/now?&apiKey=${API_KEY}`
  );
  return res.data.market === "open";
};

export const getTickerLatestPrice = async (ticker: string): Promise<number> => {
  const res = await axios.get(
    `https://api.polygon.io/v2/last/trade/${ticker}?&apiKey=${API_KEY}`
  );
  return res.data.results.p;
};
