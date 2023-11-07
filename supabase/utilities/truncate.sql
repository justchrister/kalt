-- ACL
TRUNCATE TABLE "acl_stripe_defaultCardIds";
TRUNCATE TABLE "acl_stripe_userIds";
-- Services
TRUNCATE TABLE "autoMatchOrders";
TRUNCATE TABLE "getAccountBalance";
TRUNCATE TABLE "getAssetPrice";
TRUNCATE TABLE "getLinkedBankAccount";
TRUNCATE TABLE "getPaymentCardDefault";
TRUNCATE TABLE "getPaymentCards";
TRUNCATE TABLE "getUser";
TRUNCATE TABLE "getUserPortfolio";
TRUNCATE TABLE "getUserSubscriptions";
TRUNCATE TABLE "payments";
TRUNCATE TABLE "paymentsSubscriptionsProcessing";
TRUNCATE TABLE "payRevenue";
-- sub
TRUNCATE TABLE "sub_accountTransactions_autoVest";
TRUNCATE TABLE "sub_accountTransactions_getAccountBalance";
TRUNCATE TABLE "sub_accountTransactions_payments";
TRUNCATE TABLE "sub_exchangeOrders_autoMatchOrders";
TRUNCATE TABLE "sub_exchangeOrders_getUserPortfolio";
TRUNCATE TABLE "sub_exchangeOrders_payRevenue";
TRUNCATE TABLE "sub_linkedBankAccounts_getLinkedBankAccount";
TRUNCATE TABLE "sub_paymentCards_acl_stripe";
TRUNCATE TABLE "sub_paymentCards_getPaymentCardDefault";
TRUNCATE TABLE "sub_paymentCards_getPaymentCards";
TRUNCATE TABLE "sub_paymentsPending_acl_stripe";
TRUNCATE TABLE "sub_revenueTransactions_payRevenue";
TRUNCATE TABLE "sub_userDetails_acl_stripe";
TRUNCATE TABLE "sub_userDetails_getUser";
TRUNCATE TABLE "sub_userPreferences_getAccountBalance";
TRUNCATE TABLE "sub_userPreferences_getUser";
TRUNCATE TABLE "sub_userPreferences_getUserPortfolio";
TRUNCATE TABLE "sub_userSubscriptions_getUserSubscriptions";
-- topic
TRUNCATE TABLE "topic_accountTransactions";
TRUNCATE TABLE "topic_exchangeOrders";
TRUNCATE TABLE "topic_exchangeRates";
TRUNCATE TABLE "topic_fundValuations";
TRUNCATE TABLE "topic_linkedBankAccounts";
TRUNCATE TABLE "topic_paymentCards";
TRUNCATE TABLE "topic_paymentsPending";
TRUNCATE TABLE "topic_requestAccess";
TRUNCATE TABLE "topic_revenueTransactions";
TRUNCATE TABLE "topic_userDetails";
TRUNCATE TABLE "topic_userPreferences";
TRUNCATE TABLE "topic_userSubscriptions";