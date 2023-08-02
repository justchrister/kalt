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
                      CHECK ("percentageChange" >= 0 
                      AND "percentageChange" <= 1),
  PRIMARY KEY ("userId", "date", "ticker")
);

ALTER TABLE "getUserPortfolio" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getUserPortfolio"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");