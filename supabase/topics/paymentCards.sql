-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_paymentCards"

--- create the table, with default values
CREATE TABLE "topic_paymentCards" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "userId"              uuid                            NOT NULL,
    "lastFourDigits"      CHAR(4),
    "year"                CHAR(2),
    "month"               CHAR(2),
    "cvc"                 CHAR(3),
    "number"              CHAR(16),
    "status"              text,
    "default"             boolean
);

--- add row level security
ALTER TABLE "topic_paymentCards" ENABLE ROW LEVEL SECURITY;

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