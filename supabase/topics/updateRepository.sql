-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_updateRepository"

--- create the table, with default values
CREATE TABLE "topic_updateRepository" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "targetCohorts"       text[],
    "category"            text,
    "subject"             text,
    "ingress"             text,
    "active"              boolean                        NOT NULL        DEFAULT true,
    "messages"            json
)

--- row level security
ALTER TABLE "topic_updateRepository" ENABLE ROW LEVEL SECURITY;
