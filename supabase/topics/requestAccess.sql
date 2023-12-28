-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_requestAccess"

--- create the table, with default values
CREATE TABLE "topic_requestAccess" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "email"               text,
    "firstName"           text,
    "lastName"            text,
    "monthlyInvestFrom"   numeric,
    "monthlyInvestTo"     numeric,
    "country"             text
);

--- row level security
ALTER TABLE "topic_requestAccess" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "policy_name"
    ON public."topic_requestAccess"
    FOR INSERT 
    TO public
    WITH CHECK (true);