-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_fundValuations"

--- create the table, with default values
CREATE TABLE "topic_fundValuations" (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
-- 
    "ticker"              tickers                     NOT NULL,
    "totalValuation"      numeric,
    "totalShares"         numeric,
    "shareValuation"      numeric
);

--- add row level security
ALTER TABLE "topic_fundValuations" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "topic_fundValuations"."id" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "topic_fundValuations"."entity" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column "topic_fundValuations"."sent" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "topic_fundValuations"."sender" 
is 'where the message originates, usually set in the application.';