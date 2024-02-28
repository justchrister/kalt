export type { kyc };

declare global {
  interface kyc {
    sourceOfFunds?: string;
    politicallyExposed?: boolean;
    incomeRangeFrom?: number;
    incomeRangeTo?: number;
    incomeCurrency?: string;
  }
}