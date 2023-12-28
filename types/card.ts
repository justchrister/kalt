export { card };

declare global {
    interface card {
        userId?: string;
        lastFourDigits?: number;
        year?: number;
        month?: number;
        cvc?: number;
        number?: number;
        status?: string;
        default?: boolean;
    }
}