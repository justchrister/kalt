
export { };

declare global {
  // Enums
  const enum TransactionStatus {
    Incomplete = 'incomplete',
    PaymentAwaiting = 'payment_awaiting',
    PaymentDeclined = 'payment_declined',
    PaymentAccepted = 'payment_accepted',
    WithdrawalAwaiting = 'withdrawal_awaiting',
    WithdrawalProcessing = 'withdrawal_processing',
    WithdrawalAccepted = 'withdrawal_accepted',
  }

  const enum TransactionType {
    Deposit = 'deposit',
    Withdraw = 'withdraw',
  }

  const enum TransactionSubType {
    Card = 'card',
    WireTransfer = 'wire_transfer',
    Dividend = 'dividend',
    Subscription = 'subscription',
    AutoInvested = 'auto_invested',
    AutoWithdraw = 'auto_withdraw',
  }

  const enum CardStatus {
    Incomplete = 'incomplete',
    Active = 'active',
    Rejected = 'rejected',
    Expired = 'expired',
  }

  const enum Ticker {
    GiDdf = 'gi.ddf',
  }

  const enum OrderType {
    Buy = 'buy',
    Sell = 'sell',
  }

  const enum OrderStatus {
    Open = 'open',
    Fulfilled = 'fulfilled',
    Cancelled = 'cancelled',
    Split = 'split',
  }
}