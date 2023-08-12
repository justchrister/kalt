DO $$ 
DECLARE 
  service TEXT := 'getAccountTransactions';
  topic TEXT := 'accountTransactions';

  sub TEXT :=  'sub_'|| topic || '_' || service;
  topic_table TEXT :=  'topic_'|| topic;

BEGIN
  EXECUTE format('DELETE FROM %I', sub);
  EXECUTE format('
    INSERT INTO %I (message_id, message_entity, message_sender, message_sent)
    SELECT message_id, message_entity, message_sender, message_sent
    FROM %I', sub, topic_table);
END $$;