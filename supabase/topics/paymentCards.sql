-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_paymentCards"

--- create the table, with default values
CREATE TABLE "topic_paymentCards" (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
-- 
    "userId"             uuid        NOT NULL,
    "lastFourDigits"    CHAR(4),
    "year"         CHAR(2),
    "month"        CHAR(2),
    "cvc"                 CHAR(3),
    "number"         CHAR(16),
    "status"         text,
    "default"           boolean
);

--- add row level security
ALTER TABLE "topic_paymentCards" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "topic_paymentCards"."id" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "topic_paymentCards"."entity" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column "topic_paymentCards"."sent" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "topic_paymentCards"."sender" 
is 'where the message originates, usually set in the application.';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"topic_paymentCards"'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public."topic_paymentCards"
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = "userId");
  END IF;
END
$$;