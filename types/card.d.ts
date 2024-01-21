export { card };

declare global {
    interface card {
        userId?: string;
        lastFourDigits?: number;
        year?: number;
        month?: number;
        cvc?: string | number;
        cvcIv?: string;
        number?: string | number;
        numberIv?: string;
        brand?: string;
        paymentProviderToken?: string;
        status?: string;
        default?: boolean;
    }
}