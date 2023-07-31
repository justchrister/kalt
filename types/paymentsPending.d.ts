export { paymentsPending };

declare global {
    interface paymentsPending {
        userId: string;
        amount?: number;
        currency?: string;
        transactionId?: string;
        status?: paymentsPendingStatuses;
        provider?: paymentProviders;
    }
}