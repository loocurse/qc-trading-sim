import axios from "axios";
import credentials from "./credentials.json";

export interface TickerResponse {
  ticker:       string;
  queryCount:   number;
  resultsCount: number;
  adjusted:     boolean;
  results:      Result[];
  status:       string;
  request_id:   string;
  count:        number;
}
export interface Result {
  v:  number;
  vw: number;
  o:  number;
  c:  number;
  h:  number;
  l:  number;
  t:  number;
  n:  number;
}

export const instance = axios.create({
  baseURL: "http://localhost:2000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});


export const getTickerPriceData = async (ticker: string): Promise<Result[]> => {
  const date = new Date();
  const res = await axios.get<TickerResponse>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/30/minute/${date.getTime()-577600000}/${date.getTime()}?adjusted=true&sort=desc&limit=1000&apiKey=${credentials.API_KEY}`);
  return res.data.results;
};

export const getIndex = async (): Promise<Result[]> => {
  const date = new Date()
  const res = await axios.get<TickerResponse>(`https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${date.getTime()-9777600000}/${date.getTime()}?adjusted=true&sort=asc&apiKey=${credentials.API_KEY}`);
  return res.data.results;
};


