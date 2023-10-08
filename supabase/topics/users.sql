-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_userPreferences"

--- create the table, with default values
CREATE TABLE "topic_users" (
-- meta information used for processing
    "message_id"            uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"        uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"          timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"        text                            NOT NULL,
    -- 
    "userId"                uuid                            NOT NULL,
    "firstName"             text,
    "lastName"              text,
    "country"               text,
    "city"                  text,
    "postalCode"            text,
    "birthdate"             date,
    "addressLine1"          text,
    "addressLine2"          text,
    "autoInvest"            numeric                         NOT NULL        DEFAULT 1,
    "newsletters"           boolean, 
    "termsOfService"        boolean, 
    "performanceUpdates"    boolean, 
    "colorScheme"           text,
    "profilePicture"        text,
    "language"              text,
    "currency"              text                                            REFERENCES sys_currencies(iso)
);

--- row level security
ALTER TABLE "topic_userPreferences" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_users"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId" AND auth.uid() = "message_entity");

CREATE POLICY "SELF — Select" ON "public"."topic_users"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")

--- indexes
CREATE INDEX "index_topic_users_userId_message_sent" ON public."topic_users" USING btree ("userId", "message_sent");