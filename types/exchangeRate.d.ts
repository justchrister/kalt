export { exchangeRate };

declare global {
    interface exchangeRate {
        from?: string;
        to?: string;
        rate?: number;
    }
}