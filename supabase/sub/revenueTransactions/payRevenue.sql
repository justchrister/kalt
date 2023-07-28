-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service pay_revenue
-- topic   revenue_transactions

--- create the table, with default values
CREATE TABLE pay_revenue__revenue_transactions (
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_sent     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    message_read        boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE pay_revenue__revenue_transactions ENABLE ROW LEVEL SECURITY;

-- Create the trigger function on the revenue_transactions
CREATE OR REPLACE FUNCTION pay_revenue__revenue_transactions()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO pay_revenue__revenue_transactions (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER pay_revenue__revenue_transactions
AFTER INSERT ON revenue_transactions
FOR EACH ROW
EXECUTE FUNCTION pay_revenue__revenue_transactions();