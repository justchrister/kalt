export { exchangeOrder };

declare global {
  interface exchangeOrder {
    userId: string;
    quantity?: number;
    ticker?: string;
    type?: exchangeOrdersTypes;
    status?: exchangeOrdersStatuses;
    fulfilledBy?: string;
    splitInto?: string[];
    partOf?: string;
  }
}