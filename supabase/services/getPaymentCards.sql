--- create the table, with default values
CREATE TABLE get_payment_cards (
  user_id             uuid        NOT NULL, 
  card_id             uuid        NOT NULL  DEFAULT uuid_generate_v4(),
  last_four_digits    CHAR(4),
  expiry_year         CHAR(2),
  expiry_month        CHAR(2),
  card_status         text,
  "default"           boolean,
  PRIMARY KEY (user_id, card_id)
);


ALTER TABLE get_payment_cards ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'get_payment_cards'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.get_payment_cards
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;