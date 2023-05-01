-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   user_subscriptions

--- create the table, with default values
CREATE TABLE user_subscriptions (
-- meta information used for processing
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_created     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
--
    user_id                uuid, 
    amount                numeric,
    currency              CHAR(3),
    active                  boolean,
    days_of_month           integer[]
);

--- add row level security
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column user_subscriptions.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column user_subscriptions.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column user_subscriptions.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column user_subscriptions.message_sender 
is 'where the message originates, usually set in the application.';



DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'AUTH — Insert'
  ) THEN
    CREATE POLICY "AUTH — Insert" ON public.user_subscriptions
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (TRUE);
  END IF;
END
$$;



DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.user_subscriptions
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.user_subscriptions
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;