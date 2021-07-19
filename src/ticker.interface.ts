export interface ticker {
  id: number;
  name: string;
  price: number;
  symbol: string;
  change_number: number;
  change_per: number;
  market: Market;
}

export enum Market {
  Nasdaq = "NASDAQ",
  Nyse = "NYSE",
}
