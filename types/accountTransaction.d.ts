export { accountTransaction };

declare global {
    interface accountTransaction {
        userId?: string; // UUID
        amount?: number; // numeric
        currency?: string; // CHAR(3) - references currencies(iso)
        type?: AccountTransactionsTypes;
        subType?: AccountTransactionsSubTypes;
        status?: AccountTransactionsStatuses;
        autoInvest?: number; // DECIMAL(5, 4)
    }
}