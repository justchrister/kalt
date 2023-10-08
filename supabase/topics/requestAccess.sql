-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_requestAccess"

--- create the table, with default values
CREATE TABLE "topic_requestAccess" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "email"               text                            NOT NULL,
    "firstName"           text,
    "lastName"            text,
    "country"             text
);

--- row level security
ALTER TABLE "topic_requestAccess" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "policy_name"
    ON public."topic_requestAccess"
    FOR INSERT 
    TO public
    WITH CHECK (true);