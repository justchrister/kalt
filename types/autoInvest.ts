export { autoInvest };

declare global {
  interface autoInvest {
    userId?: string;
    amount?: number;
    active?: boolean;
    interval?: autoInvestIntervals;
    lastCharged?: string;

    id?: string;
    event?: string;
    sender?: string;
    timestamp?: string;
  }
}