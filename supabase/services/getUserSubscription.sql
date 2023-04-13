--- create the table, with default values
CREATE TABLE get_user_subscription (
  user_id             uuid        PRIMARY KEY, 
  amount              numeric,
  currency            CHAR(3)     default 'EUR',
  active              boolean     default false,
  days_of_month       integer[]
);