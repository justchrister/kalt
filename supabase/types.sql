create type public."accountTransactions_statuses" as enum (
    'incomplete',
    'pending',
    'processing',
    'awaitingDivesting',
    'complete',
    'failed'
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
create type public."exchangeOrders_types" as enum (
    'buy',
    'sell'
);
create type public."exchangeOrders_statuses" as enum (
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
create type public."paymentProviders" as enum (
    'stripe'
);
create type public."withdrawalsPending_statuses" as enum (
    'pending',
    'processing',
    'failed',
    'complete'
);
create type public."transferProviders" as enum (
    'wise'
);

create type public."autoInvest_intervals" as enum (
    'daily',
    'weekly',
    'monthlyBeginning',
    'monthlyMiddle',
    'monthlyEnd'
);

create type public."tickers" as enum (
    'gi.ddf',
    'mi.ddf',
    'ffe.ddf',
    'vc.ddf',
    'smb.ddf',
    'art.ddf',
    'ah.ddf'
);