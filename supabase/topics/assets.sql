-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_assets"

--- create the table, with default values
CREATE TABLE "topic_assets" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
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
CREATE INDEX "index_topic_assets_userId_message_sent" ON public."topic_assets" USING btree ("message_entity", "ticker", "message_sent");
