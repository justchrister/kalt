create type public.card_statuses as enum (
    'incomplete',
    'active',
    'rejected',
    'expired'
);
create type public.tickers as enum (
    'gi.ddf'
);
create type public.order_types as enum (
    'buy',
    'sell'
);
create type public."order_statuses" as enum (
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
create type public.continents as enum (
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America'
);
