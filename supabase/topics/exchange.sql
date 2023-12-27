-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchange"

--- create the table, with default values
CREATE TABLE "topic_exchange" (
-- meta information used for processing
    "event"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
--
    "userId"              uuid,
    "quantity"            numeric,
    "ticker"              "tickers",
    "type"                "exchangeOrder_types",
    "status"              "exchangeOrder_statuses",
    "fulfilledBy"         uuid,
    "splitInto"           uuid[],
    "partOf"              uuid,
    "origin"              boolean,
    "processingBy"        text, -- will be uuid, set by the function
    CHECK (("type" = 'buy' AND quantity > 0) OR ("type" = 'sell' AND quantity < 0))
);

--- row level security
ALTER TABLE "topic_exchange" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_exchange"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON public."topic_exchange"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");

--- Indexes 
CREATE INDEX "index_topic_exchange_userId_timestamp" ON public."topic_exchange" USING btree ("userId", "timestamp");