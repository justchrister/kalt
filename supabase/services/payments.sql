--- create the table, with default values
CREATE TABLE payments (
  "transactionId"    uuid           NOT NULL  PRIMARY KEY,
  "userId"           uuid           NOT NULL,
  "amount"           numeric        NOT NULL,
  "currency"         text           NOT NULL  REFERENCES sys_currencies(iso),
  "processing"       boolean        NOT NULL  DEFAULT FALSE
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;