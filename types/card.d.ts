export { card };

declare global {
    interface card {
        userId?: string;
        lastFourDigits?: number;
        year?: number;
        month?: number;
        cvc?: string;
        cvcIv?: string;
        number?: string;
        numberIv?: string;
        brand?: string;
        paymentProviderToken?: string;
        status?: string;
        default?: boolean;
    }
}