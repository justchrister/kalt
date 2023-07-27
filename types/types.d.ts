export { };

declare global {
  const enum accountTransactionsStatuses {
    incomplete = 'incomplete',
    pending = 'pending',
    processing = 'processing',
    complete = 'complete'
  }
  const enum accountTransactionsTypes {
      deposit = 'deposit',
      withdraw = 'withdraw'
  }
  const enum accountTransactionsSubTypes {
      card = 'card',
      wireTransfer = 'wireTransfer',
      dividend = 'dividend',
      subscription = 'subscription',
      autoInvested = 'autoInvested',
      newShares = 'newShares',
      autoWithdraw = 'autoWithdraw'
  }
}
