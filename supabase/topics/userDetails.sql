-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   user_details

--- create the table, with default values
CREATE TABLE user_details (
-- meta information used for processing
    "id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "sender"      text                            NOT NULL,
-- 
    user_id             uuid        NOT NULL,
    first_name          text,
    last_name           text,
    country             text,
    city                text,
    postal_code         numeric,
    birthdate           date,
    address_line_1      text,
    address_line_2      text
);

--- add row level security
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;
-- changing the postal_code type to text, to support postal codes prefixed with 0
ALTER TABLE user_details ALTER COLUMN postal_code TYPE text;
-- adding check to ensure its only numbers 
ALTER TABLE user_details ADD CONSTRAINT postal_code_numeric_check CHECK (postal_code ~ '^[0-9]*$');

--- Standard descriptions
comment on column user_details.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column user_details.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column user_details.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column user_details.message_sender 
is 'where the message originates, usually set in the application.';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_details'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.user_details
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;