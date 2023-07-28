-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service <<service_name>>
-- topic   <<topic_name>>

--- create the table, with default values
CREATE TABLE <<service_name>>__<<topic_name>> (
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_sent     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    message_read        boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE <<service_name>>__<<topic_name>> ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column <<service_name>>__<<topic_name>>.message_id 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column <<service_name>>__<<topic_name>>.message_entity 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different message_ids, usually a 1:1 relation to an order_id or similar';

comment on column <<service_name>>__<<topic_name>>.message_sent 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column <<service_name>>__<<topic_name>>.message_sender 
is 'where the message originates, usually set in the application.';

comment on column <<service_name>>__<<topic_name>>.message_read 
is 'the only field that is updated in this table, when the service reads it, it changes the bool to true.';


-- Create the trigger function on the <<topic_name>>
CREATE OR REPLACE FUNCTION <<service_name>>__<<topic_name>>()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO <<service_name>>__<<topic_name>> (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER <<service_name>>__<<topic_name>>
AFTER INSERT ON <<topic_name>>
FOR EACH ROW
EXECUTE FUNCTION <<service_name>>__<<topic_name>>();