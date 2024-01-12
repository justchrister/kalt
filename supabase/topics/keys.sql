-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_keys"

--- create the table, with default values
CREATE TABLE "topic_keys" (
-- meta information used for processing
    "event"               uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"                  uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "timestamp"           timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"              text                            NOT NULL,
-- 
    "key"                 text                            NOT NULL        DEFAULT encode(pgsodium.crypto_secretbox_keygen(), 'hex'),
    "nonce"               bytea                           NOT NULL        DEFAULT pgsodium.randombytes_buf(24)
);

--- row level security
ALTER TABLE "topic_keys" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON "public"."topic_keys"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "id");

CREATE POLICY "SELF — Select" ON "public"."topic_keys"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "id")