--- create the table, with default values
CREATE TABLE "getPaymentCardDefault" (
  "userId"            uuid        PRIMARY KEY, 
  "lastFourDigits"    CHAR(4),
  "month"             CHAR(2),
  "number"            CHAR(16),
  "year"              CHAR(2)
);

ALTER TABLE "getPaymentCardDefault" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getPaymentCardDefault"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");