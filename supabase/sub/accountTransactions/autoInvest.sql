-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service auto_invest
-- topic   account_transactions

--- create the table, with default values
CREATE TABLE auto_invest__account_transactions (
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity_id   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_created     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    message_read        boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE auto_invest__account_transactions ENABLE ROW LEVEL SECURITY;

-- Create the trigger function on the account_transactions
CREATE OR REPLACE FUNCTION auto_invest__account_transactions()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO auto_invest__account_transactions (message_id, message_entity_id, message_sender, message_created)
  VALUES (NEW.message_id, NEW.message_entity_id, NEW.message_sender, NEW.message_created);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER auto_invest__account_transactions
AFTER INSERT ON account_transactions
FOR EACH ROW
EXECUTE FUNCTION auto_invest__account_transactions();