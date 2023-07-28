--- create the table, with default values
CREATE TABLE "getAccountBalance" (
  "userId"       uuid        NOT NULL PRIMARY KEY,
  "amount"       numeric,
  "currency"     CHAR(3)
);

--- Add row level security
ALTER TABLE "getAccountBalance" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getAccountBalance"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")
