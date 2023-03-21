// not in use yet, but definitely something to look into

export { };

declare global {
  type goExchangeOrder = [boolean, string, number]; 

  interface MyFancyInterface {
    
  }
  // makes code related to exchange orders more readable
  const enum exchangeOrderTypes {
    buyOrder = 0,
    sellOrder = 1
  }
  const enum transactionTypes {
    deposit = 0,
    withdrawal = 1,
    dividend = 2,
    subscription = 2,
  }
}