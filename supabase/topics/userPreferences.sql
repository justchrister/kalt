-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_userPreferences"

--- create the table, with default values
CREATE TABLE "topic_userPreferences" (
-- meta information used for processing
    "id"                    uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"                uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"                  timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"                text                            NOT NULL,
    -- 
    "userId"                uuid                            NOT NULL,
    "autoInvest"            numeric                         NOT NULL        DEFAULT 1,
    "newsletters"           boolean, 
    "termsOfService"        boolean, 
    "performanceUpdates"    boolean, 
    "colorScheme"           text,
    "profilePicture"        text,
    "language"              text,
    "currency"              text
);

--- add row level security
ALTER TABLE "topic_userPreferences" ENABLE ROW LEVEL SECURITY;