-- ACL
TRUNCATE TABLE "acl_stripe";
-- sub
TRUNCATE TABLE "sub_transactions_acl_stripe";
TRUNCATE TABLE "sub_transactions_exchange_autoOrder";
TRUNCATE TABLE "sub_exchange_match";
TRUNCATE TABLE "sub_paymentCards_acl_stripe";
TRUNCATE TABLE "sub_users_acl_stripe";
-- topic
TRUNCATE TABLE "topic_transactions";
TRUNCATE TABLE "topic_assets";
TRUNCATE TABLE "topic_autoInvest";
TRUNCATE TABLE "topic_exchange";
TRUNCATE TABLE "topic_exchangeRates";
TRUNCATE TABLE "topic_linkedBankAccounts";
TRUNCATE TABLE "topic_paymentCards";
TRUNCATE TABLE "topic_requestAccess";
TRUNCATE TABLE "topic_userDefinedFunds";
TRUNCATE TABLE "topic_users";