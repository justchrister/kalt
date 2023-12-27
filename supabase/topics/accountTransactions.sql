-- create the topic 

--- create the table, with default values
CREATE TABLE "topic_accountTransactions" (
-- meta information used for processing
    "event"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
    --- 
    "userId"              uuid                            NOT NULL,
    "amount"              numeric,
    "currency"            text                                            REFERENCES sys_currencies(iso),
    "type"                "accountTransactions_types",
    "subType"             "accountTransactions_subTypes",
    "status"              "accountTransactions_statuses",
    "autoVest"          DECIMAL(5, 4) 
                          CHECK ("autoVest" >= 0 
                          AND "autoVest" <= 1)
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