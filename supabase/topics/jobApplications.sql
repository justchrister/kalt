-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_jobApplications"

--- create the table, with default values
CREATE TABLE "topic_jobApplications" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "role"                text,
    "relevantProject"     text,
    "bio"                 text,
    "relocate"            text,
    "living"              text,
    "contact"             text

);

--- row level security
ALTER TABLE "topic_jobApplications" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "policy_name"
    ON public."topic_jobApplications"
    FOR INSERT 
    TO public
    WITH CHECK (true);