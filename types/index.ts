// not in use yet, but definitely something to look into

export { };

declare global {

  // types
  type uuid = string;

  interface Transaction {
    id: uuid;
    user_id: uuid;
    type: number;
    
  }

  // makes code related to exchange orders more readable
  const enum exchangeOrderTypes {
    buyOrder = 0,
    sellOrder = 1
  }
  const enum transactionType {
    deposit = 0,
    withdrawal = 1,
    dividend = 2,
    subscription = 2,
  }
}