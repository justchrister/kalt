--- create the table, with default values
CREATE TABLE pay_revenue (
  user_id           uuid        NOT NULL PRIMARY KEY,
  amount            numeric,
  currency          CHAR(3)
);

--- Add row level security
ALTER TABLE pay_revenue ENABLE ROW LEVEL SECURITY;
