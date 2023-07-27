export { };

declare global {
  const enum AccountTransactionsStatuses {
    Incomplete = 'incomplete',
    Pending = 'pending',
    Processing = 'processing',
    Complete = 'complete'
  }
  const enum AccountTransactionsTypes {
      Deposit = 'deposit',
      Withdraw = 'withdraw'
  }
  const enum AccountTransactionsSubTypes {
      Card = 'card',
      WireTransfer = 'wireTransfer',
      Dividend = 'dividend',
      Subscription = 'subscription',
      AutoInvested = 'autoInvested',
      NewShares = 'newShares',
      AutoWithdraw = 'autoWithdraw'
  }
}
