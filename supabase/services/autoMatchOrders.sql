--- create the table, with default values
CREATE TABLE "autoMatchOrders" (
  "userId"            uuid                      NOT NULL,
  "entity"            uuid                      NOT NULL PRIMARY KEY,
  "ticker"            tickers                   NOT NULL,
  "quantity"          numeric                   NOT NULL,
  "quantityAbsolute"  numeric                   NOT NULL,
  "orderType"         "exchangeOrders_types"    NOT NULL
);

--- Add row level security
ALTER TABLE "autoMatchOrders" ENABLE ROW LEVEL SECURITY;
