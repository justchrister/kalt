export { autoInvest };

declare global {
  interface autoInvest {
    userId?: string;
    amount?: number;
    active?: boolean;
    interval?: autoInvestIntervals;
  }
}