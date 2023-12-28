DO $$ 
DECLARE 
  service TEXT := 'getAccountTransactions';
  topic TEXT := 'transactions';

  sub TEXT :=  'sub_'|| topic || '_' || service;
  topic_table TEXT :=  'topic_'|| topic;

BEGIN
  EXECUTE format('DELETE FROM %I', sub);
  EXECUTE format('
    INSERT INTO %I (event, id, sender, timestamp)
    SELECT event, id, sender, timestamp
    FROM %I', sub, topic_table);
END $$;