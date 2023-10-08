-- create the topic 

--- create the table, with default values
CREATE TABLE "topic_accountTransactions" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
    --- 
    "userId"              uuid                            NOT NULL,
    "amount"              numeric,
    "currency"            text                                            REFERENCES sys_currencies(iso),
    "type"                "accountTransactions_types",
    "subType"             "accountTransactions_subTypes",
    "status"              "accountTransactions_statuses"  NOT NULL,
    "autoInvest"          DECIMAL(5, 4) 
                          CHECK ("autoInvest" >= 0 
                          AND "autoInvest" <= 1)
);

--- row level security
ALTER TABLE "topic_accountTransactions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_accountTransactions"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "SELF — Select" ON "public"."topic_accountTransactions"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")