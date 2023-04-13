--- create the table, with default values
CREATE TABLE get_user_portfolio (
  user_id           uuid                            NOT NULL,
  date              date                            NOT NULL,
  ticker            tickers                         NOT NULL,
  quantity_today    numeric,
  quantity_change   numeric,
  value             numeric,
  value_currency    CHAR(3),
  percentage_change DECIMAL(5, 4)
                    CHECK (percentage_change >= 0 
                    AND percentage_change <= 1),
  PRIMARY KEY (user_id, date, ticker)
);

