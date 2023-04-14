-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   payment_cards

--- create the table, with default values
CREATE TABLE payment_cards (
-- meta information used for processing
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_created     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
-- 
    user_id             uuid        NOT NULL,
    last_four_digits    CHAR(4),
    expiry_year         CHAR(2),
    expiry_month        CHAR(2),
    card_status         text,
    "default"           boolean
);

--- add row level security
ALTER TABLE payment_cards ENABLE ROW LEVEL SECURITY;
-- changing the postal_code type to text, to support postal codes prefixed with 0
ALTER TABLE payment_cards ALTER COLUMN postal_code TYPE text;
-- adding check to ensure its only numbers 
ALTER TABLE payment_cards ADD CONSTRAINT postal_code_numeric_check CHECK (postal_code ~ '^[0-9]*$');

--- Standard descriptions
comment on column payment_cards.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column payment_cards.message_entity_id 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column payment_cards.message_created 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column payment_cards.message_sender 
is 'where the message originates, usually set in the application.';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'payment_cards'
      AND policyname = 'SELF — Insert'
  ) THEN
    CREATE POLICY "SELF — Insert" ON public.payment_cards
      AS PERMISSIVE FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;