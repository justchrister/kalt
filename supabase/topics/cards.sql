-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_cards"

--- create the table, with default values
CREATE TABLE "topic_cards" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "userId"              uuid                            NOT NULL,
    "year"                numeric,
    "month"               numeric,
    "cvc"                 numeric,
    "number"              text,
    "status"              text,
    "default"             boolean
);

--- row level security
ALTER TABLE "topic_cards" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_cards"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON "public"."topic_cards"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")