export { transaction };

declare global {
  interface transaction {
    userId?: string;
    amount?: number;
    currency?: string;
    type?: transactionsTypes;
    subType?: transactionsSubTypes;
    status?: transactionsStatuses;
    autoVest?: number;
  }
}