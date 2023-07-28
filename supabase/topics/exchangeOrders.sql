-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchangeOrders"

--- create the table, with default values
CREATE TABLE "topic_exchangeOrders" (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
--
    "userId"              uuid            NOT NULL,
    "quantity"            numeric,
    "ticker"              tickers,
    "type"                "exchangeOrders_types",
    "status"              "exchangeOrders_statuses",
    "fulfilledBy"         uuid,
    "splitInto"           uuid[],
    "partOf"              uuid,
    CHECK (("type" = 'buy' AND quantity > 0) OR ("type" = 'sell' AND quantity < 0))
);

--- add row level security
ALTER TABLE "topic_exchangeOrders" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "topic_exchangeOrders"."id" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "topic_exchangeOrders"."entity" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column "topic_exchangeOrders"."created" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "topic_exchangeOrders"."sender" 
is 'where the message originates, usually set in the application.';



DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"topic_exchangeOrders"'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public."topic_exchangeOrders"
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
      AND tablename = '"topic_exchangeOrders"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."topic_exchangeOrders"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;
