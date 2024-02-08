-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_inviteRequests"

--- create the table, with default values
CREATE TABLE "topic_inviteRequests" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL
);

--- row level security
ALTER TABLE "topic_inviteRequests" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_inviteRequests"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "id");