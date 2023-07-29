-- version 29.7.23
-- service getUserSubscriptions
-- topic   userSubscriptions

--- create the table, with default values
CREATE TABLE "sub_userSubscriptions_getUserSubscriptions" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "sub_userSubscriptions_getUserSubscriptions"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_userSubscriptions_getUserSubscriptions" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate"
AFTER INSERT ON "topic_userSubscriptions"
FOR EACH ROW
EXECUTE FUNCTION "sub_userSubscriptions_getUserSubscriptions"();


-- Set up webhook function 

CREATE OR REPLACE FUNCTION "getUserSubscriptions/webhooks/userSubscriptions"()
RETURNS TRIGGER AS $$
DECLARE 
  response RECORD;
  payload TEXT;
BEGIN
  -- Convert row data to json then to string format
  payload := row_to_json(NEW)::text;
  SELECT * INTO response FROM http_post(
    'https://ka.lt/api/getUserSubscriptions/webhooks/userSubscriptions',
    payload,
    'application/json'
  );
  RAISE NOTICE 'API Response: %', response.content;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook trigger
CREATE TRIGGER "webhook"
AFTER INSERT ON "trigger_userSubscriptions_getUserSubscriptions"
FOR EACH ROW
EXECUTE FUNCTION sub_webhook(NEW);