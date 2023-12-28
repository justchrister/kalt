-- version 29.7.23
-- service exchange: autoOrder
-- topic   transactions

--- create the table, with default values
CREATE TABLE "sub_transactions_exchange_autoOrder" (
    "event"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"             uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "timestamp"      timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "sender"         text          NOT NULL,
    "read"           boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_transactions_exchange_autoOrder"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_transactions_exchange_autoOrder" (event, id, sender, timestamp)
  VALUES (NEW.event, NEW.id, NEW.sender, NEW.timestamp);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_transactions_exchange_autoOrder"
AFTER INSERT ON "topic_transactions"
FOR EACH ROW
EXECUTE FUNCTION "replicate_transactions_exchange_autoOrder"();

-- Enable RLS
ALTER TABLE "sub_transactions_exchange_autoOrder" ENABLE ROW LEVEL SECURITY;