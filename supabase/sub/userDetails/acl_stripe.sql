-- version 29.7.23
-- service acl_stripe
-- topic   userDetails

--- create the table, with default values
CREATE TABLE "sub_userDetails_acl_stripe" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_userDetails_acl_stripe"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_userDetails_acl_stripe" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_userDetails_acl_stripe"
AFTER INSERT ON "topic_userDetails"
FOR EACH ROW
EXECUTE FUNCTION "replicate_userDetails_acl_stripe"();

-- Enable RLS
ALTER TABLE "sub_userDetails_acl_stripe" ENABLE ROW LEVEL SECURITY;