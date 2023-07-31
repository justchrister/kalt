export { paymentCard };

declare global {
    interface paymentCard {
        userId: string;
        lastFourDigits?: string;
        year?: string;
        month?: string;
        cvc?: string;
        number?: string;
        status?: string;
        default?: boolean;
    }
}