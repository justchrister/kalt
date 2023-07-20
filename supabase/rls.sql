
--- Add row level security
ALTER TABLE get_user_portfolio ENABLE ROW LEVEL SECURITY;

ALTER TABLE get_account_transactions ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'currencies'
      AND policyname = 'AUTH — Select'
  ) THEN
    CREATE POLICY "AUTH — Select" ON public.currencies
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END
$$;



DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.user_subscriptions
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
      AND tablename = 'revenue_transactions'
      AND policyname = 'HQ — Insert'
  ) THEN
    CREATE POLICY "HQ — Insert" ON public.revenue_transactions
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = 'f1359334-a0f2-4b43-a6cc-06a86b8e4d49');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_subscriptions'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.user_subscriptions
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;
CREATE POLICY "PUBLIC — Insert"
ON public.request_access
FOR INSERT
WITH CHECK (true);
