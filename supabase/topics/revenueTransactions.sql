-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_revenueTransactions"

--- create the table, with default values
CREATE TABLE "topic_revenueTransactions" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
    -- 
    "ticker"              tickers     NOT NULL, 
    "amount"              numeric,
    "currency"            text
);

--- add row level security
ALTER TABLE "topic_revenueTransactions" ENABLE ROW LEVEL SECURITY;