export { fundValuation };

declare global {
    interface fundValuation {
        ticker: tickers; 
        totalValuation?: number;
        totalShares?: number;
        shareValuation?: number;
    }
}