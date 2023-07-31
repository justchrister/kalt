export { userSubscription };

declare global {
    interface userSubscription {
        userId?: string;
        amount?: number;
        currency?: string;
        active?: boolean;
        days?: number[];
    }
}