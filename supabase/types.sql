create type public.transaction_statuses as enum (
    'incomplete',
    'payment_awaiting',
    'payment_declined',
    'payment_accepted',
    'withdrawal_awaiting',
    'withdrawal_processing',
    'withdrawal_accepted',
    'payment_processing'
);
create type public.transaction_types as enum (
    'deposit',
    'withdraw'
);
create type public.transaction_sub_types as enum (
    'card',
    'wire_transfer',
    'dividend',
    'subscription',
    'auto_invested',
    'new_shares',
    'auto_withdraw'
);
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
create type public.order_statuses as enum (
    'open',
    'fulfilled',
    'cancelled',
    'split'
);
create type public.payments_pending_statuses as enum (
    'pending',
    'processing',
    'failed',
    'complete'
);
create type public.payment_providers as enum (
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