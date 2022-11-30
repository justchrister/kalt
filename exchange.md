# Exchange service and table
Orders are either buy or sell, there is no buyer of a sell order nor is there a seller on a buy order. They are matched by a <img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="" width="15" height="15" />  Supabase function 

##The fields: 
- order_id
UUIDv4 generated automatically
- user_id
buyer or seller of the asset
- fulfilled_by_order_id
UUIDv4 of the order that is fulfilling this order
- order_type
0 = buy
1 = sell
- ticker
Defining the asset you are buying (DDGIF for global index, DDSIF for solar fund, DDSIF_NO for the country specific fund). However, only DDGIF are traded.
- quantity
amount
- created_at
- modified_at
