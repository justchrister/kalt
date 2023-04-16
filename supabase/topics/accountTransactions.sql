-- create the topic 

--- create the table, with default values
CREATE TABLE account_transactions (
-- meta information used for processing
    message_id            uuid                      NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id     uuid                      NOT NULL  DEFAULT uuid_generate_v4(),
    message_created       timestamptz               NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender        text                      NOT NULL,
--- 
    user_id               uuid                      NOT NULL,
    amount                numeric,
    currency              CHAR(3)                                                                REFERENCES currencies(iso),
    transaction_type      transaction_types,
    transaction_sub_type  transaction_sub_types,
    transaction_status    transaction_statuses      NOT NULL,
    auto_invest           DECIMAL(5, 4) 
                          CHECK (auto_invest >= 0 
                          AND auto_invest <= 1)     NOT NULL
);

--- add row level security
ALTER TABLE account_transactions ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column user_details.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column user_details.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column user_details.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column user_details.message_sender 
is 'where the message originates, usually set in the application.';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'account_transactions'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.account_transactions
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;