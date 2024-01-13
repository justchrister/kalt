export { card };

declare global {
    interface card {
        userId?: string;
        lastFourDigits?: number;
        year?: number;
        month?: number;
        cvc?: number;
        number?: string;
        numberIv?: string;
        status?: string;
        default?: boolean;
    }
}