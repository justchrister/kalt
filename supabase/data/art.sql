-- create the topic 

--- create the table, with default values
CREATE TABLE "data_artworks" (
-- meta information used for processing
    "message_id"          uuid              NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid              NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz       NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text              NOT NULL,
    --- 
    "data"                jsonb             NOT NULL,
    "modelVersion"        numeric                           DEFAULT 1
);

--- row level security
ALTER TABLE "topic_accountTransactions" DISABLE ROW LEVEL SECURITY;
