--- create the table, with default values
CREATE TABLE "getPaymentCardDefault" (
  "userId"            uuid        PRIMARY KEY, 
  "lastFourDigits"    numeric,
  "month"             numeric,
  "number"            numeric,
  "year"              numeric
);

ALTER TABLE "getPaymentCardDefault" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getPaymentCardDefault"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");