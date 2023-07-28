--- create the table, with default values
CREATE TABLE "getAccountTransactions" (
  "userId"           uuid                    NOT NULL,
  "date"              timestamptz             NOT NULL,
  "amount"            numeric                 NOT NULL,
  "type"              "accountTransactions_types"       NOT NULL,
  "subType"          "accountTransactions_subTypes"   NOT NULL,
  PRIMARY KEY ("userId", date)
);

--- Add row level security
ALTER TABLE "getAccountTransactions" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"getAccountTransactions"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."getAccountTransactions"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;