--- create the table, with default values
CREATE TABLE "getAccountTransactions" (
  "userId"           uuid                             NOT NULL,
  "date"             timestamptz                      NOT NULL,
  "amount"           numeric                          NOT NULL,
  "currency"         text                             REFERENCES sys_currencies(iso),
  "type"             "accountTransactions_types"      NOT NULL,
  "subType"          "accountTransactions_subTypes"   NOT NULL,
  PRIMARY KEY ("userId", date)
);

--- Add row level security
ALTER TABLE "getAccountTransactions" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getAccountTransactions"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")