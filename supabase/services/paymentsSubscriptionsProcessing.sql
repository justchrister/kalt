--- create the table, with default values
CREATE TABLE payments_subscriptions_processing (
  processing_id uuid NOT NULL  PRIMARY KEY,
  timestampz    timestamptz NOT NULL  DEFAULT now()
);

ALTER TABLE payments_subscriptions_processing ENABLE ROW LEVEL SECURITY;