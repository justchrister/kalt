drop type public."transaction_statuses";
create type public."transaction_statuses" as enum (
    'incomplete',
    'pending',
    'processing',
    'complete',
    'vested',
    'failed'
);
drop type public."transaction_types";
create type public."transaction_types" as enum (
    'deposit',
    'withdraw'
);
drop type public."cohort_types";
create type public."cohort_types" as enum (
    'variable',
    'constant'
);
drop type public."transaction_subTypes";
create type public."transaction_subTypes" as enum (
    'card',
    'wireTransfer',
    'dividend',
    'internal'
);
drop type public."cards_statuses";
create type public."cards_statuses" as enum (
    'incomplete',
    'active',
    'rejected',
    'expired'
);
drop type public."exchangeOrder_types";
create type public."exchangeOrder_types" as enum (
    'buy',
    'sell'
);
drop type public."exchangeOrder_statuses";
create type public."exchangeOrder_statuses" as enum (
    'open',
    'processing',
    'fulfilled',
    'cancelled',
    'split'
);
drop type public."paymentProviders";
create type public."paymentProviders" as enum (
    'stripe'
);
drop type public."transferProviders";
create type public."transferProviders" as enum (
    'wise'
);
drop type public."autoInvest_intervals";
create type public."autoInvest_intervals" as enum (
    'daily',
    'weekly',
    'monthlyBeginning',
    'monthlyMiddle',
    'monthlyEnd'
);
drop type public."tickers";
create type public."tickers" as enum (
    'ffe',
    'vc',
    'smb',
    'art',
    'ah'
);
drop type public."funds_state";
create type public."funds_state" as enum (
    'active',
    'inactive',
    'beta',
    'alfa'
);