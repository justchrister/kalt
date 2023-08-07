-- version 29.7.23
-- service getPaymentCardDefault
-- topic   paymentCards

--- create the table, with default values
CREATE TABLE "sub_paymentCards_getPaymentCardDefault" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_paymentCards_getPaymentCardDefault"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_paymentCards_getPaymentCardDefault" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_paymentCards_getPaymentCardDefault"
AFTER INSERT ON "topic_paymentCards"
FOR EACH ROW
EXECUTE FUNCTION "replicate_paymentCards_getPaymentCardDefault"();

-- Enable RLS
ALTER TABLE "sub_paymentCards_getPaymentCardDefault" ENABLE ROW LEVEL SECURITY;