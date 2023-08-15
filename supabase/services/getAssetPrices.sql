--- create the table, with default values
CREATE TABLE "getAssetPrice" (
  "ticker"            tickers        NOT NULL,
  "date"              date           NOT NULL,
  "currency"          text         NOT NULL     REFERENCES sys_currencies(iso),
  "price"             numeric,
  
  PRIMARY KEY (ticker, currency, date)
);

--- Add row level security
ALTER TABLE "getAssetPrice" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getAssetPrice"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (TRUE)
