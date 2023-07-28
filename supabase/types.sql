create type public."accountTransactions_statuses" as enum (
    'incomplete',
    'pending',
    'processing',
    'complete'
);
create type public."accountTransactions_types" as enum (
    'deposit',
    'withdraw'
);
create type public."accountTransactions_subTypes" as enum (
    'card',
    'wireTransfer',
    'dividend',
    'subscription',
    'autoInvested',
    'newShares',
    'autoWithdraw'
);

create type public."paymentCards_statuses" as enum (
    'incomplete',
    'active',
    'rejected',
    'expired'
);
create type public."exchangeOrder_types" as enum (
    'buy',
    'sell'
);
create type public."exchangeOrder_statuses" as enum (
    'open',
    'fulfilled',
    'cancelled',
    'split'
);
create type public."paymentsPending_statuses" as enum (
    'pending',
    'processing',
    'failed',
    'complete'
);
create type public."payments_paymentProviders" as enum (
    'stripe'
);


create type public.tickers as enum (
    'gi.ddf',
    'mi.ddf',
    'ffe.ddf',
    'ffe.ddf'
);