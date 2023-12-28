export { userDefinedFund };

declare global {
  interface userDefinedFund {
    id?: string;
    rate?: number;
    ticker?: tickers;
  }
}