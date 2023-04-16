--- create the table, with default values
CREATE TABLE get_linked_bank_accounts (
  user_id             uuid        NOT NULL,
  "name"              text,
  email               text,
  iban                text,
  bank_code           text,
  PRIMARY KEY (user_id, iban)
);

--- Add row level security
ALTER TABLE get_linked_bank_accounts ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."get_linked_bank_accounts"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id)
