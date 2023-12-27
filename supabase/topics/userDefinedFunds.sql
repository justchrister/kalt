-- create the topic 

--- create the table, with default values
CREATE TABLE "topic_userDefinedFunds" (
-- meta information used for processing
    "event"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
    --- 
    "userId"              uuid                            NOT NULL,
    "rate"                numeric,
    "ticker"              tickers                                         REFERENCES sys_funds(ticker), 
                          CHECK ("rate" >= 0 
                          AND "rate" <= 3)
);

--- row level security
ALTER TABLE "topic_userDefinedFunds" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_userDefinedFunds"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON "public"."topic_userDefinedFunds"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")


--- Indexes

CREATE INDEX "index_topic_userDefinedFunds_id_ticker_timestamp" ON public."topic_userDefinedFunds" USING btree ("id", "ticker", "timestamp");