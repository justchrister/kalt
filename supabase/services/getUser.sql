--- create the table, with default values
CREATE TABLE get_user (
    user_id             uuid        NOT NULL    PRIMARY KEY,
    first_name          text,
    last_name           text,
    country             text,
    city                text,
    postal_code         numeric,
    birthdate           date,
    address_line_1      text,
    address_line_2      text,
    auto_invest         numeric,
    email_marketing     boolean, 
    color_schema        text,
    language            text,
    currency            text
);

--- add row level security
ALTER TABLE get_user ENABLE ROW LEVEL SECURITY;
-- changing the postal_code type to text, to support postal codes prefixed with 0
ALTER TABLE get_user ALTER COLUMN postal_code TYPE text;
-- adding check to ensure its only numbers 
ALTER TABLE get_user ADD CONSTRAINT postal_code_numeric_check CHECK (postal_code ~ '^[0-9]*$');

-- Row level security

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'get_user'
      AND policyname = 'SELF — Select'
  ) THEN
    CREATE POLICY "SELF — Select" ON public.get_user
      AS PERMISSIVE FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END
$$;