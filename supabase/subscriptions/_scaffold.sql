-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 13.4.23
-- service <<serviceName>>
-- topic   <<topic_name>>

--- create the table, with default values
CREATE TABLE "<<serviceName>>_<<topicName>>" (
    "messageId"           uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "messageEntityId"     uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    "messageCreated"      timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    "messageSender"       text        NOT NULL,
    "messageRead"         boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE "<<serviceName>>_<<topicName>>" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "<<serviceName>>_<<topicName>>"."messageId" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "<<serviceName>>_<<topicName>>"."messageEntityId" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different "messageId"s, usually a 1:1 relation to an order_id or similar';

comment on column "<<serviceName>>_<<topicName>>"."messageCreated" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "<<serviceName>>_<<topicName>>"."messageSender" 
is 'where the message originates, usually set in the application.';

comment on column "<<serviceName>>_<<topicName>>".message_read 
is 'the only field that is updated in this table, when the service reads it, it changes the bool to true.';


-- Create the trigger function on the <<topic_name>>
CREATE OR REPLACE FUNCTION <<serviceName>>_<<topicName>>()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "<<serviceName>>_<<topicName>>" ("messageId", "messageEntityId", "messageSender", "messageCreated")
  VALUES (NEW."messageId", NEW."messageEntityId", NEW."messageSender", NEW."messageCreated");
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER "<<serviceName>>_<<topicName>>"
AFTER INSERT ON "<<topic_name>>"
FOR EACH ROW
EXECUTE FUNCTION <<serviceName>>_<<topicName>>();