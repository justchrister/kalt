export { revenueTransactions };

declare global {
    interface revenueTransactions {
        ticker: tickers;
        amount?: number;
        currency?: string;
    }
}