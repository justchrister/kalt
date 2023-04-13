-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service "getUserSubscription"
-- topic   "userSubscriptions"

--- create the table, with default values
CREATE TABLE "getUserSubscription_userSubscriptions" (
    "massageId"           uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "massageEntityId"     uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    "messageCreated"      timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    "messageSender"       text        NOT NULL,
    "messageRead"         boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE "getUserSubscription_userSubscriptions" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "getUserSubscription_userSubscriptions"."massageId" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "getUserSubscription_userSubscriptions"."massageEntityId" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different massageIds, usually a 1:1 relation to an orderId or similar';

comment on column "getUserSubscription_userSubscriptions"."messageCreated" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "getUserSubscription_userSubscriptions"."messageSender" 
is 'where the message originates, usually set in the application.';

comment on column "getUserSubscription_userSubscriptions"."messageRead" 
is 'the only field that is updated in this table, when the service reads it, it changes the bool to true.';


-- Create the trigger function on the "userSubscriptions"
CREATE OR REPLACE FUNCTION "getUserSubscription_userSubscriptions"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "getUserSubscription_userSubscriptions" ("massageId", "massageEntityId", "messageSender", "messageCreated")
  VALUES (NEW."massageId", NEW."massageEntityId", NEW."messageSender", NEW."messageCreated");
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER "getUserSubscriptio_userSubscriptions"
AFTER INSERT ON "userSubscriptions"
FOR EACH ROW
EXECUTE FUNCTION "getUserSubscription_userSubscriptions"();