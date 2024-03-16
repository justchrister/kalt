-- create a topic/ledger, by simply renaming all instances of <<topic_name>
-- version 10.03.24
-- topic   <<topic_name>>

--- create the table, with default values
CREATE TABLE "topic_updates" (
-- meta information used for processing
  "event"         uuid            NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
  "id"            uuid            NOT NULL  DEFAULT uuid_generate_v4(),
  "timestamp"     timestamptz     NOT NULL  DEFAULT (now() at time zone 'utc'),
  "sender"        text            NOT NULL,
-- columns
  "userId"        uuid            NOT NULL,
  "cohort"        text,
  "messages"      json,
  "title"         text,
  "ingress"       text,
  "category"      text,
  "read"          boolean
);

--- row level security
ALTER TABLE "topic_updates" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "SELF — Insert" ON public."topic_updates"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON "public"."topic_updates"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");