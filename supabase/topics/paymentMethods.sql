-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_paymentmethods"

--- create the table, with default values
CREATE TABLE "topic_paymentmethods" (
-- meta information used for processing
    "event"                   uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"               timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"                  text                            NOT NULL,
--
    "provider"                text,
    "intentToken"             text,
    "authenticationRequested" boolean
);

--- row level security
ALTER TABLE "topic_paymentmethods" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_paymentmethods"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "id");

CREATE POLICY "SELF — Select" ON "public"."topic_paymentmethods"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "id")