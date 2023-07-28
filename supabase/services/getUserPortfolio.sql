--- create the table, with default values
CREATE TABLE "getUserPortfolio" (
  "userId"            uuid                            NOT NULL,
  "date"              date                            NOT NULL,
  "ticker"            tickers                         NOT NULL,
  "quantityToday"     numeric,
  "quantityChange"    numeric,
  "value"             numeric,
  "valueCurrency"     CHAR(3),
  "percentageChange"  DECIMAL(5, 4)
                      CHECK (percentage_change >= 0 
                      AND percentage_change <= 1),
  PRIMARY KEY (user_id, date, ticker)
);



ALTER TABLE "getUserPortfolio" ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"getUserPortfolio"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."getUserPortfolio"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;