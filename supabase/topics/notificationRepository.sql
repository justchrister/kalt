-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_notificationRepository"

--- create the table, with default values
CREATE TABLE "topic_notificationRepository" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "targets"             text[],
    "type"                text,
    "subject"             text,
    "message"             json
);

--- row level security
ALTER TABLE "topic_notificationRepository" ENABLE ROW LEVEL SECURITY;