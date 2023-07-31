-- version 31.7.23
-- service <<service>>
-- topic   <<topic>>

--- create the table, with default values
CREATE TABLE "sub_<<topic>>_<<service>>" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_<<topic>>_<<service>>"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_<<topic>>_<<service>>" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_<<topic>>_<<service>>"
AFTER INSERT ON "topic_<<topic>>"
FOR EACH ROW
EXECUTE FUNCTION "replicate_<<topic>>_<<service>>"();

-- Set up webhook function 

CREATE OR REPLACE FUNCTION "webhook_<<service>>_<<topic>>"()
RETURNS TRIGGER AS $$
DECLARE 
  response RECORD;
  payload TEXT;
BEGIN
  -- Convert row data to json then to string format
  payload := row_to_json(NEW)::text;
  SELECT * INTO response FROM http_post(
    'https://ka.lt/api/<<service>>/webhooks/<<topic>>',
    payload,
    'application/json'
  );
  RAISE NOTICE 'API Response: %', response.content;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook trigger
CREATE TRIGGER "webhook_<<service>>_<<topic>>"
AFTER INSERT ON "sub_<<topic>>_<<service>>"
FOR EACH ROW
EXECUTE FUNCTION "webhook_<<service>>_<<topic>>"(NEW);

-- Enable RLS
ALTER TABLE "sub_<<topic>>_<<service>>" ENABLE ROW LEVEL SECURITY;