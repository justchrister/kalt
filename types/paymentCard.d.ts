export { paymentCard };

declare global {
    interface paymentCard {
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