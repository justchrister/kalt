--- create the table, with default values
CREATE TABLE get_payment_card_default (
  user_id             uuid        PRIMARY KEY, 
  last_four_digits    CHAR(4),
  expiry_month        CHAR(2),
  card_number         CHAR(16),
  expiry_year         CHAR(2)
);


ALTER TABLE get_payment_card_default ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'get_payment_card_default'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.get_payment_card_default
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;