--- create the table, with default values
CREATE TABLE "payRevenue" (
  "userId"      uuid        NOT NULL    PRIMARY KEY,
  "amount"      numeric,
  "currency"    text                    REFERENCES sys_currencies(iso)
);

--- row level security
ALTER TABLE "payRevenue" ENABLE ROW LEVEL SECURITY;
