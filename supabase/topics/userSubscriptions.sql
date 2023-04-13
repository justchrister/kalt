-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "userSubscriptions"

--- create the table, with default values
CREATE TABLE "userSubscriptions" (
-- meta information used for processing
    "messageId"             uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "messageEntityId"       uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    "messageCreated"        timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    "messageSender"         text        NOT NULL,
--
    "userId"                uuid, 
    "amount"                numeric,
    "currency"              CHAR(3),
    "daysOfMonth"           integer[]
);

--- add row level security
ALTER TABLE "userSubscriptions" ENABLE ROW LEVEL SECURITY;

--- Standard descriptions
comment on column "userSubscriptions"."messageId" 
is 'this is the unique id of this message, not the unique id of its contents. (for instance, account_transactions have their own account_transaction_id';

comment on column "userSubscriptions"."messageEntityId" 
is 'Used to correlate messages that are associated with a single entity, since they will have updates in the same table with different "messageId"s, usually a 1:1 relation to an order_id or similar';

comment on column "userSubscriptions"."messageCreated" 
is 'when the message was generated, usually set in the application. It can be created in javascript by doing ok.timestamptz()';

comment on column "userSubscriptions"."messageSender" 
is 'where the message originates, usually set in the application.';