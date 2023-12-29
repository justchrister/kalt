insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "origin") values
  ('setup script',  'DDF00002-9933-4eaf-886b-e6e7e5b0205a', -100, 'art', 'sell', 'open', true);

insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "origin") values
  ('setup script',  'DDF00003-9933-4eaf-886b-e6e7e5b0205a', -20, 'vc', 'sell', 'open', true);
insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "origin") values
  ('setup script',  'DDF00001-9933-4eaf-886b-e6e7e5b0205a', -20, 'ffe', 'sell', 'open', true);

insert into public."topic_assets" ("timestamp", "sender", "ticker", "value", "name")
  values ('2021-7-29 16:42:50.498065+00', 'setup script', 'vc', 200, 'Tillit');

insert into public."topic_assets" ("sender", "ticker", "value", "name")
  values ('setup script', 'ffe', 200, 'Fossil free energy');

insert into public."topic_assets" ("timestamp", "sender", "ticker", "value", "name")
  values ('2021-7-29 16:42:50.498065+00', 'setup script', 'art', 1000, 'Basquiat');

insert into public."topic_assets" ("timestamp", "sender", "ticker", "value", "name")
  values ('2023-12-29 16:42:50.498065+00', 'setup script', 'art', 1200, 'Basquiat');