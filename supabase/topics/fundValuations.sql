-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_fundValuations"

--- create the table, with default values
CREATE TABLE "topic_fundValuations" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "ticker"              tickers                     NOT NULL,
    "totalValuation"      numeric,
    "totalShares"         numeric,
    "shareValuation"      numeric
);

--- row level security
ALTER TABLE "topic_fundValuations" ENABLE ROW LEVEL SECURITY;
