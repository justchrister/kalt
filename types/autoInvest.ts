export { autoInvest };

declare global {
  interface autoInvest {
    id?: string;
    amount?: number;
    active?: boolean;
    interval?: autoInvestIntervals;
    lastCharged?: string;
  }
}