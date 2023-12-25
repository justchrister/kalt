export { accountTransaction };

declare global {
    interface accountTransaction {
        userId?: string; // UUID
        amount?: number; // numeric
        currency?: string; // references currencies(iso)
        type?: AccountTransactionsTypes;
        subType?: AccountTransactionsSubTypes;
        status?: AccountTransactionsStatuses;
        autoVest?: number; // DECIMAL(5, 4)
    }
}