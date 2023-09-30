insert into public."topic_exchangeOrders" ("message_sender", "userId", "quantity", "ticker", "type", "status", "fulfilledBy", "splitInto", "partOf", "origin") values
  ('setup script',  'DDF00002-9933-4eaf-886b-e6e7e5b0205a', -100, 'art.ddf', 'sell', 'open', null, null, null, true);

insert into public."topic_exchangeOrders" ("message_sender", "userId", "quantity", "ticker", "type", "status", "fulfilledBy", "splitInto", "partOf", "origin") values
  ('setup script',  'DDF00003-9933-4eaf-886b-e6e7e5b0205a', -20, 'vc.ddf', 'sell', 'open', null, null, null, true);

insert into public."topic_assets" ("message_sender", "ticker", "value", "name")
  values ('setup script', 'vc.ddf', 200, 'Tillit');

insert into public."topic_assets" ("message_sender", "ticker", "value", "name")
  values ('setup script', 'art.ddf', 1000, 'Basquiat');

insert into public."topic_userDetails" ("message_sender", "userId", "firstName", "lastName", "country", "birthdate", "city", "postalCode") values
                                       ('setup script',   'ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4', 'Christer',  'Bjornstad', 'NO',      '1996-10-30T15:35:25+00:00', 'OSLO', '0254');

insert into public."topic_userPreferences" ("message_sender", "userId",                               "language", "currency",  "autoInvest") values
                                           ('setup script',   'ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4', 'NOR',      'EUR',       1);