--- create the table, with default values
CREATE TABLE get_account_balance (
  user_id           uuid        NOT NULL PRIMARY KEY,
  amount            numeric,
  currency          CHAR(3)
);

--- Add row level security
ALTER TABLE get_account_balance ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."get_account_balance"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id)
