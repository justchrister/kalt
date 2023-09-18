-- create the topic 

--- create the table, with default values
CREATE TABLE "topic_userDefinedFunds" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
    --- 
    "userId"              uuid                            NOT NULL,
    "rate"                tickers,
    "ticker"              text                                            REFERENCES sys_funds(ticker), 
                          CHECK ("rate" >= 0 
                          AND "rate" <= 3)
);

--- add row level security
ALTER TABLE "topic_userDefinedFunds" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_userDefinedFunds"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");
