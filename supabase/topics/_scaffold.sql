-- create a topic/ledger, by simply renaming all instances of <<topic_name>
-- version 10.03.24
-- topic   <<topic_name>>

--- create the table, with default values
CREATE TABLE "topic_<<topic_name>>" (
-- meta information used for processing
    "event"         uuid            NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"            uuid            NOT NULL  DEFAULT uuid_generate_v4(),
    "timestamp"     timestamptz     NOT NULL  DEFAULT (now() at time zone 'utc'),
    "sender"        text            NOT NULL,
-- columns
);

--- row level security
ALTER TABLE "topic_<<topic_name>>" ENABLE ROW LEVEL SECURITY;