-- create a topic, by simply renaming all instances of <<topic_name>
-- version 28.7.23
-- topic   <<topic_name>>

--- create the table, with default values
CREATE TABLE "topic_<<topic_name>>" (
-- meta information used for processing
    "message_id"       uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"   text        NOT NULL
);

--- row level security
ALTER TABLE "topic_<<topic_name>>" ENABLE ROW LEVEL SECURITY;