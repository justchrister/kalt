-- version 29.7.23
-- service getUserPortfolio
-- topic   exchangeOrders

--- create the table, with default values
CREATE TABLE "sub_exchangeOrders_getUserPortfolio" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "sub_exchangeOrders_getUserPortfolio"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_exchangeOrders_getUserPortfolio" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate"
AFTER INSERT ON "topic_exchangeOrders"
FOR EACH ROW
EXECUTE FUNCTION "sub_exchangeOrders_getUserPortfolio"();


-- Set up webhook function 

CREATE OR REPLACE FUNCTION "getUserPortfolio/webhooks/exchangeOrders"()
RETURNS TRIGGER AS $$
DECLARE 
  response RECORD;
  payload TEXT;
BEGIN
  -- Convert row data to json then to string format
  payload := row_to_json(NEW)::text;
  SELECT * INTO response FROM http_post(
    'https://ka.lt/api/getUserPortfolio/webhooks/exchangeOrders',
    payload,
    'application/json'
  );
  RAISE NOTICE 'API Response: %', response.content;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook trigger
CREATE TRIGGER "webhook"
AFTER INSERT ON "trigger_exchangeOrders_getUserPortfolio"
FOR EACH ROW
EXECUTE FUNCTION sub_webhook(NEW);