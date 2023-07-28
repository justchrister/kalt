-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_userSubscriptions"

--- create the table, with default values
CREATE TABLE "topic_userSubscriptions" (
-- meta information used for processing
    "id"             uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"         uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"         text                            NOT NULL,
--
    "userId"         uuid, 
    "amount"         numeric,
    "currency"       CHAR(3),
    "active"         boolean,
    "days"           integer[]
);

--- add row level security
ALTER TABLE "topic_userSubscriptions" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"topic_userSubscriptions"'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public."topic_userSubscriptions"
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = "userId");
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"topic_userSubscriptions"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."topic_userSubscriptions"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;