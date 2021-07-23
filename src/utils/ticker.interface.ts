export interface ticker {
  id: number;
  name: string;
  price: number;
  symbol: string;
  change: number;
  change_perc: number;
  exchange: Market;
}

export enum Market {
  Nasdaq = "NASDAQ",
  Nyse = "NYSE",
}
