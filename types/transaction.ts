export { transaction };

declare global {
    interface transaction {
        userId?: string;
        amount?: number;
        currency?: string;
        type?: AccountTransactionsTypes;
        subType?: AccountTransactionsSubTypes;
        status?: AccountTransactionsStatuses;
        autoVest?: number;
    }
}