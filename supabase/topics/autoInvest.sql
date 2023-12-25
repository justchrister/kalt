-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_autoInvest"

--- create the table, with default values
CREATE TABLE "topic_autoInvest" (
-- meta information used for processing
    "message_id"             uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"         uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"         text                            NOT NULL,
--
    "userId"                 uuid, 
    "amount"                 numeric,
    "active"                 boolean,
    "interval"               "autoInvest_intervals", 
    "lastCharged"            timestamptz
);

--- row level security
ALTER TABLE "topic_autoInvest" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_autoInvest"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON public."topic_autoInvest"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");



--- Indexes

CREATE INDEX "index_topic_autoInvest_userId_message_sent" ON public."topic_autoInvest" USING btree ("userId", "message_sent")