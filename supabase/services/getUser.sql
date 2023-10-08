--- create the table, with default values
CREATE TABLE "getUser" (
    "userId"              uuid          NOT NULL    PRIMARY KEY,
    "firstName"           text,
    "lastName"            text,
    "country"             text,
    "city"                text,
    "postalCode"          text,
    "birthdate"           date,
    "addressLine1"        text,
    "addressLine2"        text,
    "autoInvest"          numeric,
    "newsletters"         boolean, 
    "termsOfService"      boolean, 
    "performanceUpdates"  boolean, 
    "colorScheme"         text,
    "profilePicture"      text                      DEFAULT 'alt1',
    "language"            text,
    "currency"            text     REFERENCES sys_currencies(iso),
);

--- row level security
ALTER TABLE "getUser" ENABLE ROW LEVEL SECURITY;
-- adding check to ensure its only numbers 
ALTER TABLE "getUser" ADD CONSTRAINT postalCode_numeric_check CHECK ("postalCode" ~ '^[0-9]*$');

-- Row level security


--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getUser"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");