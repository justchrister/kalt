-- version 29.7.23
-- service match
-- topic   exchange

--- create the table, with default values
CREATE TABLE "sub_exchange_match" (
    "event"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "id"             uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "timestamp"      timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "sender"         text          NOT NULL,
    "read"           boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_exchange_match"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_exchange_match" (event, id, sender, timestamp)
  VALUES (NEW.event, NEW.id, NEW.sender, NEW.timestamp);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_exchange_match"
AFTER INSERT ON "topic_exchange"
FOR EACH ROW
EXECUTE FUNCTION "replicate_exchange_match"();

-- Enable RLS
ALTER TABLE "sub_exchange_match" ENABLE ROW LEVEL SECURITY;