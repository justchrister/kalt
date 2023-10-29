-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_withdrawalsPending"

--- create the table, with default values
CREATE TABLE "topic_withdrawalsPending" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "userId"              uuid                            NOT NULL,
    "amount"              numeric,
    "currency"            text                                            REFERENCES sys_currencies(iso),
    "linkedBankAccountId" uuid                            NOT NULL,
    "transactionId"       uuid,
    "status"              "withdrawalsPending_statuses"   NOT NULL,
    "provider"            "transferProviders"             NOT NULL
);

--- row level security
ALTER TABLE "topic_withdrawalsPending" ENABLE ROW LEVEL SECURITY;