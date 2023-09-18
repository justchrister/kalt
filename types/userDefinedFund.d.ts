export { userDefinedFund };

declare global {
  interface userDefinedFund {
    userId?: string;
    rate?: number;
    ticker?: tickers;
  }
}