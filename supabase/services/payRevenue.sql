--- create the table, with default values
CREATE TABLE "payRevenue" (
  user_id           uuid        NOT NULL PRIMARY KEY,
  amount            numeric,
  currency          CHAR(3)
);

--- Add row level security
ALTER TABLE "payRevenue" ENABLE ROW LEVEL SECURITY;
