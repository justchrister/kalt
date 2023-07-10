--- create the table, with default values
CREATE TABLE payments (
  transaction_id    uuid                            NOT NULL  PRIMARY KEY,
  user_id           uuid                            NOT NULL,
  amount            numeric                         NOT NULL,
  currency          CHAR(3)                         NOT NULL,
  processing        boolean                         NOT NULL  DEFAULT FALSE
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;