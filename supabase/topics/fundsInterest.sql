-- create a topic/ledger, by simply renaming all instances of <<topic_name>
-- version 10.03.24
-- topic   fundsInterest

--- create the table, with default values
CREATE TABLE "topic_fundsInterest" (
-- meta information used for processing
    "event"         uuid            NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"            uuid            NOT NULL  DEFAULT uuid_generate_v4(),                                   -- userId
    "timestamp"     timestamptz     NOT NULL  DEFAULT (now() at time zone 'utc'),
    "sender"        text            NOT NULL,
-- columns
    "ticker"        tickers                                                      REFERENCES sys_funds(ticker)
);

--- row level security
ALTER TABLE "topic_fundsInterest" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_fundsInterest"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "id");

CREATE POLICY "SELF — Select" ON "public"."topic_fundsInterest"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "id");


--- Indexes

CREATE INDEX "index_topic_fundsInterest_id_ticker_timestamp" ON public."topic_fundsInterest" USING btree ("id", "ticker", "timestamp");