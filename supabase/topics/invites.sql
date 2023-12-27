-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_invites"

--- create the table, with default values
CREATE TABLE "topic_invites" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "issuedTo"            text,
    "monthlyInvestFrom"   numeric,
    "code"                text,
    "used"                boolean
);

--- row level security
ALTER TABLE "topic_invites" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "policy_name"
    ON public."topic_invites"
    FOR INSERT 
    TO public
    WITH CHECK (true);