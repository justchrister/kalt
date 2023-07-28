-- create the topic 

--- create the table, with default values
CREATE TABLE "topic_accountTransactions" (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
    --- 
    "userId"      uuid                            NOT NULL,
    "amount"      numeric,
    "currency"    CHAR(3)                                         REFERENCES sys_currencies(iso),
    "type"        "accountTransactions_types",
    "subType"     "accountTransactions_subTypes",
    "status"      "accountTransactions_statuses"  NOT NULL,
    "autoInvest"  DECIMAL(5, 4) 
                  CHECK ("autoInvest" >= 0 
                  AND "autoInvest" <= 1)          NOT NULL
);

--- add row level security
ALTER TABLE "topic_accountTransactions" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "topic_accountTransactions".id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "topic_accountTransactions".entity 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column "topic_accountTransactions".sent 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "topic_accountTransactions".sender
is 'where the message originates, usually set in the application.';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'topic_accountTransactions'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public."topic_accountTransactions"
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = "userId");
  END IF;
END
$$;
