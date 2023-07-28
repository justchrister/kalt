--- create the table, with default values
CREATE TABLE "getUserSubscription" (
  "userId"             uuid        PRIMARY KEY, 
  "amount"             numeric,
  "currency"           CHAR(3)     default 'EUR',
  "active"             boolean     default false,
  "days"               integer[]
);

ALTER TABLE "getUserSubscription" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"getUserSubscription"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."getUserSubscription"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;