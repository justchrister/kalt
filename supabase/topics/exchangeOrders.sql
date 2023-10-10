-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchangeOrders"

--- create the table, with default values
CREATE TABLE "topic_exchangeOrders" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
--
    "userId"              uuid,
    "quantity"            numeric,
    "ticker"              "tickers",
    "type"                "exchangeOrders_types",
    "status"              "exchangeOrders_statuses",
    "fulfilledBy"         uuid,
    "splitInto"           uuid[],
    "partOf"              uuid,
    "origin"              boolean,
    CHECK (("type" = 'buy' AND quantity > 0) OR ("type" = 'sell' AND quantity < 0))
);

--- row level security
ALTER TABLE "topic_exchangeOrders" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_exchangeOrders"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON public."topic_exchangeOrders"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");

CREATE POLICY "HQ — Insert" ON public."topic_exchangeOrders"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  USING (auth.uid() = 'ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4');

CREATE POLICY "HQ — Select" ON public."topic_exchangeOrders"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = 'ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4');

--- Indexes 
CREATE INDEX "index_topic_exchangeOrders_userId_message_sent" ON public."topic_exchangeOrders" USING btree ("userId", "message_sent");