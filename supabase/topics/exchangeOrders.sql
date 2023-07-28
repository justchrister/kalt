-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_exchangeOrders"

--- create the table, with default values
CREATE TABLE "topic_exchangeOrders" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
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
