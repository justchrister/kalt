-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service acl_stripe
-- topic   user_details

--- create the table, with default values
CREATE TABLE acl_stripe__user_details (
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_sent     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    message_read        boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE acl_stripe__user_details ENABLE ROW LEVEL SECURITY;

-- Create the trigger function on the user_details
CREATE OR REPLACE FUNCTION acl_stripe__user_details()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO acl_stripe__user_details (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER acl_stripe__user_details
AFTER INSERT ON user_details
FOR EACH ROW
EXECUTE FUNCTION acl_stripe__user_details();