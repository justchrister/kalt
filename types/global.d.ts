declare interface ExchangeOrder {
  message_entity_id: string;
  user_id: string;
  ticker: string;
  order_type: string;
  order_status: string;
  quantity: number;
  quantity_absolute: number;
}