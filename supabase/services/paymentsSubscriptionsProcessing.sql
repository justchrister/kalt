--- create the table, with default values
CREATE TABLE "paymentsSubscriptionsProcessing" (
  "processingId"  uuid          NOT NULL    PRIMARY KEY,
  "timestampz"    timestamptz   NOT NULL    DEFAULT now()
);

ALTER TABLE "paymentsSubscriptionsProcessing" ENABLE ROW LEVEL SECURITY;