-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   exchange_orders

--- create the table, with default values
CREATE TABLE exchange_orders (
-- meta information used for processing
    message_id          uuid            NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id   uuid            NOT NULL  DEFAULT uuid_generate_v4(),
    message_created     timestamptz     NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text            NOT NULL,
--
    user_id             uuid            NOT NULL,
    quantity            numeric,
    ticker              tickers,
    order_type          order_types,
    order_status        order_statuses,
    fulfilled_by_id     uuid,
    split_into          uuid[],
    part_of             uuid,
    CHECK ((order_type = 'buy' AND quantity > 0) OR (order_type = 'sell' AND quantity < 0))
);

--- add row level security
ALTER TABLE exchange_orders ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column exchange_orders.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column exchange_orders.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column exchange_orders.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column exchange_orders.message_sender 
is 'where the message originates, usually set in the application.';



DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'exchange_orders'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.exchange_orders
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
      AND tablename = 'exchange_orders'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.exchange_orders
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;
