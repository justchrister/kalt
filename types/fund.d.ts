export { fund };

declare global {
  interface fund {
    ticker?: tickers;
    name?: string;
    description?: string;
  }
}