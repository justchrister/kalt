-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_invites"

--- create the table, with default values
CREATE TABLE "topic_invites" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "issuedTo"            uuid,
    "code"                text,
    "used"                boolean
);

--- row level security
ALTER TABLE "topic_invites" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Select" ON "public"."topic_invites"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "issuedTo");