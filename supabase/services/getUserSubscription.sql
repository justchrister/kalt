--- create the table, with default values
CREATE TABLE get_user_subscription (
  user_id             uuid        PRIMARY KEY, 
  amount              numeric,
  currency            CHAR(3)     default 'EUR',
  active              boolean     default false,
  days_of_month       integer[]
);


ALTER TABLE get_user_subscription ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'get_user_subscription'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.get_user_subscription
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;