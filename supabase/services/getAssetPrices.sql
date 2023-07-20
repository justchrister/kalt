

--- create the table, with default values
CREATE TABLE asset_prices (
  ticker            tickers        NOT NULL,
  date              date           NOT NULL,
  currency          CHAR(3)        NOT NULL,
  asset_price       numeric,
  PRIMARY KEY (ticker, currency, date)
);

--- Add row level security
ALTER TABLE asset_prices ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."asset_prices"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (TRUE)
