--- create the table, with default values
CREATE TABLE "getPaymentCards" (
  "userId"            uuid        NOT NULL, 
  "cardId"            uuid        NOT NULL  DEFAULT uuid_generate_v4(),
  "lastFourDigits"    numeric,
  "year"              numeric,
  "month"             numeric,
  "status"            text,
  "default"           boolean,
  "number"            numeric,
  "cvc"               numeric,
  PRIMARY KEY ("userId", "cardId")
);


ALTER TABLE "getPaymentCards" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getPaymentCards"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");