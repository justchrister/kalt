insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "fulfilledBy", "splitInto", "partOf", "origin") values
  ('setup script',  'DDF00002-9933-4eaf-886b-e6e7e5b0205a', -100, 'art', 'sell', 'open', null, null, null, true);

insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "fulfilledBy", "splitInto", "partOf", "origin") values
  ('setup script',  'DDF00003-9933-4eaf-886b-e6e7e5b0205a', -20, 'vc', 'sell', 'open', null, null, null, true);
insert into public."topic_exchange" ("sender", "userId", "quantity", "ticker", "type", "status", "fulfilledBy", "splitInto", "partOf", "origin") values
  ('setup script',  'DDF00001-9933-4eaf-886b-e6e7e5b0205a', -20, 'ffe', 'sell', 'open', null, null, null, true);

insert into public."topic_assets" ("sender", "ticker", "value", "name")
  values ('setup script', 'vc', 200, 'Tillit');
insert into public."topic_assets" ("sender", "ticker", "value", "name")
  values ('setup script', 'ffe', 200, 'Fossil free energy');

insert into public."topic_assets" ("sender", "ticker", "value", "name")
  values ('setup script', 'art', 1000, 'Basquiat');