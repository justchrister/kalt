-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_userDetails"

--- create the table, with default values
CREATE TABLE "topic_userDetails" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "userId"              uuid                            NOT NULL,
    "firstName"           text,
    "lastName"            text,
    "country"             text,
    "city"                text,
    "postalCode"          text,
    "birthdate"           date,
    "addressLine1"        text,
    "addressLine2"        text
);

-- adding check to ensure its only numbers 
ALTER TABLE "topic_userDetails" ADD CONSTRAINT postalCode_numeric_check CHECK ("postalCode" ~ '^[0-9]*$');

--- add row level security
ALTER TABLE "topic_userDetails" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_userDetails"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");