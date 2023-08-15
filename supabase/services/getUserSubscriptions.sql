--- create the table, with default values
CREATE TABLE "getUserSubscriptions" (
  "userId"             uuid        PRIMARY KEY, 
  "amount"             numeric,
  "currency"           text     default 'EUR'      REFERENCES sys_currencies(iso),,
  "active"             boolean     default false,
  "days"               integer[]
);

ALTER TABLE "getUserSubscriptions" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getUserSubscriptions"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");