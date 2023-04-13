--- create the table, with default values
CREATE TABLE auto_match_orders (
  user_id           uuid               NOT NULL,
  message_entity_id uuid               NOT NULL PRIMARY KEY,
  ticker            tickers            NOT NULL,
  quantity          numeric            NOT NULL,
  quantity_absolute numeric            NOT NULL,
  order_type        order_types        NOT NULL
);

--- Add row level security
ALTER TABLE auto_match_orders ENABLE ROW LEVEL SECURITY;
