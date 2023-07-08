-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   revenue_transactions

--- create the table, with default values
CREATE TABLE revenue_transactions (
-- meta information used for processing
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_created     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    -- 
    ticker              tickers     NOT NULL, 
    amount              numeric,
    currency            text
);

--- add row level security
ALTER TABLE revenue_transactions ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column revenue_transactions.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column revenue_transactions.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column revenue_transactions.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column revenue_transactions.message_sender 
is 'where the message originates, usually set in the application.';