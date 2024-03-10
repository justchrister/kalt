-- create a topic/ledger, by simply renaming all instances of <<topic_name>
-- version 10.03.24
-- topic   cohorts

--- create the table, with default values
CREATE TABLE "topic_cohorts" (
-- meta information used for processing
    "event"         uuid            NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"            uuid            NOT NULL  DEFAULT uuid_generate_v4(),
    "timestamp"     timestamptz     NOT NULL  DEFAULT (now() at time zone 'utc'),
    "sender"        text            NOT NULL,
-- columns
    "type"          "cohort_types",
    "name"          text,
    "description"   text,
    "active"        text
);

--- row level security
ALTER TABLE "topic_cohorts" ENABLE ROW LEVEL SECURITY;