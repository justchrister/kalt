--- create the table, with default values
CREATE TABLE "payments_subscriptionsProcessing" (
  "processingId"  uuid          NOT NULL    PRIMARY KEY,
  "timestampz"    timestamptz   NOT NULL    DEFAULT now()
);

ALTER TABLE "payments_subscriptionsProcessing" ENABLE ROW LEVEL SECURITY;