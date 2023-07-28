--- create the table, with default values
CREATE TABLE get_account_transactions (
  user_id           uuid                    NOT NULL,
  date              timestamptz             NOT NULL,
  amount            numeric                 NOT NULL,
  type              transaction_types       NOT NULL,
  sub_type          transaction_sub_types   NOT NULL,
  PRIMARY KEY (user_id, date)
);

--- Add row level security
ALTER TABLE get_account_transactions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'get_account_transactions'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.get_account_transactions
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;