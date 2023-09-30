-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchangeRates"

--- create the table, with default values
CREATE TABLE "topic_exchangeRates" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
--
    "from"                text                            NOT NULL        REFERENCES sys_currencies(iso),
    "to"                  text                            NOT NULL        REFERENCES sys_currencies(iso),
    "rate"                numeric
);

--- add row level security
ALTER TABLE "topic_exchangeRates" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "AUTH — Select"
    ON public."topic_exchangeRates"
    FOR SELECT 
    TO authenticated 
    USING (
        true
    );
