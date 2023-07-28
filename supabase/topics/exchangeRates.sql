-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchangeRates"

--- create the table, with default values
CREATE TABLE "topic_exchangeRates" (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
--
    "from"                CHAR(3)         NOT NULL,
    "to"                  CHAR(3)         NOT NULL,
    "rate"                numeric
);

--- add row level security
ALTER TABLE "topic_exchangeRates" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "topic_exchangeRates"."id" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "topic_exchangeRates"."entity" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column "topic_exchangeRates"."sent" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "topic_exchangeRates"."sender" 
is 'where the message originates, usually set in the application.';