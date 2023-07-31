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
  const enum paymentCardsStatuses {
    incomplete = 'incomplete',
    active = 'active',
    rejected = 'rejected',
    expired = 'expired'
  }
  const enum exchangeOrdersTypes {
    buy = 'buy',
    sell = 'sell'
  }
  const enum exchangeOrdersStatuses {
    open = 'open',
    fulfilled = 'fulfilled',
    cancelled = 'cancelled',
    split = 'split'
  }
  const enum paymentsPendingStatuses {
    pending = 'pending',
    processing = 'processing',
    failed = 'failed',
    complete = 'complete'
  }
  const enum paymentProviders {
    stripe = 'stripe'
  }
  const enum tickers {
    gi_ddf = 'gi.ddf',
    mi_ddf = 'mi.ddf',
    ffe_ddf = 'ffe.ddf',
    ah_ddf = 'ah.ddf'
  }
}
