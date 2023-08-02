--- create the table, with default values
CREATE TABLE payments (
  "transactionId"    uuid           NOT NULL  PRIMARY KEY,
  "userId"           uuid           NOT NULL,
  "amount"           numeric        NOT NULL,
  "currency"         CHAR(3)        NOT NULL,
  "processing"       boolean        NOT NULL  DEFAULT FALSE
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;