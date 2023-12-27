-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_assets"

--- create the table, with default values
CREATE TABLE "topic_assets" (
-- meta information used for processing
    "event"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
--
    "ticker"              tickers,
    "value"               numeric,
    "name"                text
);

--- row level security
ALTER TABLE "topic_assets" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "AUTH — Select"
  ON public."topic_assets"
  FOR SELECT 
  TO authenticated 
  USING (true);


--- Indexes 
CREATE INDEX "index_topic_assets_userId_timestamp" ON public."topic_assets" USING btree ("id", "ticker", "timestamp");
