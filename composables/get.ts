export const get = (client: any) => {
  return {
    accountBalance: async (user: user) => {
      const { getAccountBalance } = await import('./get/accountBalance');
      return await getAccountBalance(client, user) as accountBalance;
    },
    autoInvest: async (user: user) => {
      const { getAutoInvest } = await import('./get/autoInvest');
      return await getAutoInvest(client, user) as autoInvest;
    },
    defaultPaymentMethod: async (user: user) => {
      const { getDefaultPaymentMethod } = await import('./get/defaultPaymentMethod');
      return await getDefaultPaymentMethod(client, user) as defaultPaymentMethod;
    },
    exchangeRates: async (from, to) => {
      const { getExchangeRates } = await import('./get/exchangeRates');
      return await getExchangeRates(client, from, to) as exchangeRates;
    },
    funds: async () => {
      const { getFunds } = await import('./get/funds');
      return await getFunds(client) as funds;
    },
    key: async (auth: any) => {
      const { getKey } = await import('./get/key');
      return await getKey(client, auth) as key;
    },
    languageDetails: async (iso: any) => {
      const { getLanguageDetails } = await import('./get/languageDetails');
      return await getLanguageDetails(client, iso) as languageDetails;
    },
    linkedBankAccount: async (user: any) => {
      const { getLinkedBankAccount } = await import('./get/linkedBankAccount');
      return await getLinkedBankAccount(client, user) as linkedBankAccount;
    },
    openExchangeOrder: async (ticker: string, type: string, quantityAbsolute: number) => {
      const { getOpenExchangeOrder } = await import('./get/openExchangeOrder');
      return await getOpenExchangeOrder(client, ticker, type, quantityAbsolute) as exchangeOrder;
    },
    paymentMethod: async (user: user) => {
      const { getPaymentMethod } = await import('./get/paymentMethod');
      return await getPaymentMethod(client, user) as paymentMethod;
    },
    portfolio: async (user: user) => {
      const { getPortfolio } = await import('./get/portfolio');
      return await getPortfolio(client, user) as portfolio;
    },
    processingExchangeOrder: async (id: string) => {
      const { getProcessingExchangeOrder } = await import('./get/processingExchangeOrder');
      return await getProcessingExchangeOrder(client, id) as exchangeOrder;
    },
    setupIntent: async (user: user) => {
      const { getSetupIntent } = await import('./get/setupIntent');
      return await getSetupIntent(user) as setupIntent;
    },
    sharePrices: async () => {
      const { getSharePrices } = await import('./get/sharePrices');
      return await getSharePrices(client) as sharePrices;
    },
    transactions: async (user: user) => {
      const { getTransactions } = await import('./get/transactions');
      return await getTransactions(client, user) as transactions;
    },
    user: async (auth: any) => {
      const { getUser } = await import('./get/user');
      return await getUser(client, auth) as user;
    },
    userDefinedFund: async (user: user) => {
      const { getUserDefinedFund } = await import('./get/userDefinedFund');
      return await getUserDefinedFund(client, user) as userDefinedFund;
    },
    userDefinedFunds: async (user: user, ticker: any) => {
      const { getUserDefinedFunds } = await import('./get/userDefinedFunds');
      return await getUserDefinedFunds(client, user, ticker) as paymentMethod;
    }
  }
}