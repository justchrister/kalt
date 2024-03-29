-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_userPreferences"

--- create the table, with default values
CREATE TABLE "topic_users" (
-- meta information used for processing
    "event"                 uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                    uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"             timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"                text                            NOT NULL,
    -- 
    "firstName"             text,
    "lastName"              text,
    "country"               text,
    "city"                  text,
    "postalCode"            text,
    "birthdate"             date,
    "addressLine1"          text,
    "addressLine2"          text,
    "autoVest"              numeric,
    "newsletters"           boolean,
    "termsOfService"        boolean,
    "performanceUpdates"    boolean,
    "kycIncome"             boolean,
    "profilePicture"        text,
    "paymentProviderId"     text,
    "language"              text,
    "cohorts"               text[],
    "currency"              text                                            REFERENCES sys_currencies(iso)
);

--- row level security
ALTER TABLE "topic_users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_users"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "id");

CREATE POLICY "SELF — Select" ON "public"."topic_users"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "id");

--- indexes
CREATE INDEX "index_topic_users_id_timestamp" ON public."topic_users" USING btree ("id", "timestamp");