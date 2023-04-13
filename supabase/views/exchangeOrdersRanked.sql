CREATE OR REPLACE VIEW exchange_orders_ranked AS
WITH ranked_messages AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS rn
    FROM exchange_orders
)
, combined_messages AS (
    SELECT DISTINCT message_entity_id,
           FIRST_VALUE(message_id) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS message_id,
           FIRST_VALUE(message_created) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS message_created,
           FIRST_VALUE(message_sender) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS message_sender,
           FIRST_VALUE(user_id) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS user_id,
           FIRST_VALUE(quantity) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS quantity,
           FIRST_VALUE(ticker) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS ticker,
           FIRST_VALUE(order_type) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS order_type,
           FIRST_VALUE(order_status) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS order_status,
           FIRST_VALUE(fulfilled_by_id) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS fulfilled_by_id,
           FIRST_VALUE(split_into) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS split_into,
           FIRST_VALUE(part_of) OVER (PARTITION BY message_entity_id ORDER BY message_created DESC) AS part_of
    FROM ranked_messages
)
SELECT *
FROM combined_messages
ORDER BY message_created DESC;