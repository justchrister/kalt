export { AccountTransaction };
declare global {
  interface AccountTransaction {
    messageId?: string; // UUID
    messageEntityId?: string; // UUID
    messageCreated?: Date; // timestamptz
    messageSender?: string;
    userId?: string; // UUID
    amount?: number; // numeric
    currency?: string; // CHAR(3) - references currencies(iso)
    transactionType?: TransactionType;
    transactionSubType?: TransactionSubType;
    transactionStatus?: TransactionStatus;
    autoInvest?: number; // DECIMAL(5, 4)
  }
}