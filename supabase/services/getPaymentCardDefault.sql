--- create the table, with default values
CREATE TABLE "getPaymentCardDefault" (
  "userId"            uuid        PRIMARY KEY, 
  "lastFourDigits"    CHAR(4),
  "month"             CHAR(2),
  "number"            CHAR(16),
  "year"              CHAR(2)
);


ALTER TABLE "getPaymentCardDefault" ENABLE ROW LEVEL SECURITY;


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = '"getPaymentCardDefault"'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public."getPaymentCardDefault"
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = "userId");
  END IF;
END
$$;