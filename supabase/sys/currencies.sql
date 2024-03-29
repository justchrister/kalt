-- create table
create table public.sys_currencies (
  "iso"         text primary key,
  "name"        text,
  "usedIn"      text,
  "enabled"     boolean
);

--- row level security
ALTER TABLE sys_currencies ENABLE ROW LEVEL SECURITY;

-- insert values
insert into public.sys_currencies ("iso", "name", "usedIn") values
('AED',     'Arabic dirham',                  'United Arab Emirates'                ),
('AFN',     'Afghani',                        'Afghanistan'                         ),
('ALL',     'Lek',                            'Albania'                             ),
('AMD',     'Dram',                           'Armenia'                             ),
('ANG',     'Netherlands Antillean guilder',  'Sint Maarten, Curacao'               ),
('AOA',     'kwanza',                         'Angola'                              ),
('ARS',     'Argentine peso',                 'Argentina'                           ),
('AUD',     'Australian dollar',              'Australia'                           ),
('AWG',     'guilder','Aruba'),
('AZN',     'manat','Azerbaijan'),
('BAM',     'Convertible mark','Bosnia and Herzegovina'),
('BBD','Barbadian dollar','Barbados'),
('BDT','taka','Bangladesh'),
('BGN','Bulgarian lev','Bulgaria'),
('BHD','Bahrain dinar','Bahrain'),
('BIF','Burundi franc','Burundi'),
('BMD','Bermudian dollar','Bermuda'),
('BND','Brunei dollar','Brunei'),
('BOB','boliviano','Bolivia'),
('BRL','Brazilian real','Brazil'),
('BSD','Bahamian dollar','Bahamas'),
('BTN','ngultrum','Bhutan'),
('BWP','pula','Botswana'),
('BYR','Belarus rubel','Belarus'),
('BZD','Belize dollar','Belize'),
('CAD','Canadian dollar','Canada'),
('CDF','Congolais franc','Democratic Republic of the Congo'),
('CHF','Swiss franc','Liechtenstein, Switzerland'),
('CKD','Cook dollar','Cook Islands'),
('CLP','Chilean peso','Chile'),
('CNY','Renminbi yuan','China'),
('COP','Colombian peso','Colombia'),
('CRC','colón','Costa Rica'),
('CUP','Cuban peso','Cuba'),
('CVE','Cape Verdean escudo','Cape Verde'),
('CZK','Czech krone','Czechia'),
('DJF','Djibouti franc','Djibouti'),
('DKK','Danish krone','Greenland, Denmark'),
('DOP','Dominican peso','Dominican Republic'),
('DZD','Algerian dinar','Algeria'),
('EGP','Egypt pound','Egypt'),
('ERN','nakfa','Eritrea'),
('ETB','birr','Ethiopia'),
('EUR','Euro','XXX'),
('FJD','Fidschi dollar','Fiji'),
('FKP','Falklands pound','Falkland Islands'),
('FOK','Faroese krona','Faroe Islands'),
('GBP','Sterling pound','United Kingdom, South Georgia and South Sandwich Islands'),
('GEL','Georgian lari','Georgia'),
('GGP','Guernsey pound','Guernsey'),
('GHS','Ghana cedi','Ghana'),
('GIP','Gibraltar pound','Gibraltar'),
('GMD','dalasi','Gambia'),
('GNF','Guinea franc','Guinea'),
('GTQ','quetzal','Guatemala'),
('GYD','Guyana dollar','Guyana'),
('HKD','Hong Kong dollar','Hong Kong'),
('HNL','lempira','Honduras'),
('HRK','kuna','Croatia'),
('HTG','gourde','Haiti'),
('HUF','Hungarian forint','Hungary'),
('IDR','Indonesian rupiah','Indonesia'),
('ILS','Israeli shekel','Israel, Palestine'),
('IMP','Manx pound','Isle of Man'),
('INR','Indian rupee','India'),
('IQD','Iraqi dinar','Iraq'),
('IRR','Iranian rial','Iran'),
('ISK','Icelandic krone','Iceland'),
('JEP','Jersey Sterling pound','Jersey'),
('JMD','Jamaica dollar','Jamaica'),
('JOD','Jordanian dinar','Jordan'),
('JPY','Japanese yen','Japan'),
('KES','Kenian schilling','Kenya'),
('KGS','som','Kyrgyzstan'),
('KHR','Cambodian riel','Cambodia'),
('KID','Kiribati dollar','Kiribati'),
('KMF','Comorian franc','Comoros'),
('KPW','won','North Korea'),
('KRW','won','South Korea'),
('KWD','Kuwaiti dinar','Kuwait'),
('KYD','Cayman dollar','Cayman Islands'),
('KZT','tenge','Kazakhstan'),
('LAK','kip','Laos'),
('LBP','Lebanese pound','Lebanon'),
('LKR','Sri Lanka rupee','Sri Lanka'),
('LRD','Liberian dollar','Liberia'),
('LSL','Lesotho loti','Lesotho'),
('LYD','Libyan dinar','Libya'),
('MAD','Moroccan dirham','Western Sahara, Morocco'),
('MDL','leu','Moldova'),
('MGA','Malagasy ariary','Madagascar'),
('MKD','denar','North Macedonia'),
('MMK','kyat','Burma'),
('MNT','tugrik','Mongolia'),
('MOP','Macanese pataca','Macao'),
('MRO','ouguiya','Mauritania'),
('MUR','Mauritian rupee','Mauritius'),
('MVR','Maldivian rufiyaa','Maldives'),
('MWK','kwacha','Malawi'),
('MXN','Mexican peso','Mexico'),
('MYR','ringgit','Malaysia'),
('MZN','metical','Mozambique'),
('NAD','Namibian dollar','Namibia'),
('NGN','naira','Nigeria'),
('NIO','Córdoba oro','Nicaragua'),
('NOK','Norwegian krone','Svalbard, Norway, Bouvet Island'),
('NPR','Nepalese rupee','Nepal'),
('NZD','New Zealand dollar','Niue, Pitcairn Islands, Tokelau, New Zealand'),
('OMR','Omani rial','Oman'),
('PAB','Panamanian balboa','Panama'),
('PEN','Nuevo sol','Peru'),
('PGK','kina','Papua New Guinea'),
('PHP','Philippine peso','Philippines'),
('PKR','Pakistanian rupee','Pakistan'),
('PLN','zloty','Poland'),
('PYG','guaraní','Paraguay'),
('QAR','Qatari rial','Qatar'),
('RON','leu','Romania'),
('RSD','Serbian dinar','Serbia'),
('RUB','Russian rubel','Russia'),
('RWF','Rwandan franc','Rwanda'),
('SAR','Saudi rial','Saudi Arabia'),
('SBD','Salomon dollar','Solomon Islands'),
('SCR','Seychelles rupee','Seychelles'),
('SDG','Sudanese pound','Sudan'),
('SEK','Swedish krone','Sweden'),
('SGD','Singapore dollar','Singapore'),
('SHP','St.-Helena pound','Saint Helena, Ascension and Tristan da Cunha'),
('SLL','leone','Sierra Leone'),
('SOS','Somalian shilling','Somalia'),
('SRD','Surinam dollar','Suriname'),
('SSP','South Sudanese pound','South Sudan'),
('STD','dobra','Sao Tome and Principe'),
('SYP','Syrian pound','Syria'),
('SZL','Swazi lilangeni','Eswatini'),
('THB','Thai baht','Thailand'),
('TJS','somoni','Tajikistan'),
('TMT','manat','Turkmenistan'),
('TND','Tunesian dinar','Tunisia'),
('TOP','pa''anga','Tonga'),
('TRY','Turkish lira','Turkey'),
('TTD','Trinidad and Tobago dollar','Trinidad and Tobago'),
('TVD','Tuvaluan dollar','Tuvalu'),
('TWD','New Taiwan dollar','Taiwan'),
('TZS','Tansanian shilling','Tanzania'),
('UAH','hrywnja','Ukraine'),
('UGX','Ugandan schilling','Uganda'),
('USD','US dollar','American Samoa, British Virgin Islands, Ecuador, El Salvador, Guam, East Timor, Marshall Islands, Federated States of Micronesia, Palau, Northern Mariana Islands, Puerto Rico, Turks and Caicos Islands, United States, Virgin Islands, British Indian Ocean Territory, Bonaire, Saint Eustatius and Saba'),
('UYU','Uruguay peso','Uruguay'),
('UZS','Uzbekistan sum','Uzbekistan'),
('VND','dong','Vietnam'),
('VUV','vatu','Vanuatu'),
('WST','tala','Samoa'),
('XAF','Central African franc','Gabon, Cameroon, Central African Republic, Republic of the Congo, Equatorial Guinea, Chad'),
('XCD','East Caribbean dollar','Anguilla, Antigua and Barbuda, Dominica, Grenada, Montserrat, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines'),
('XOF','West African franc','Benin, Burkina Faso, Guinea-Bissau, Mali, Niger, Ivory Coast, Senegal, Togo'),
('XPF','Pacific franc','French Polynesia, New Caledonia, Wallis and Futuna'),
('YER','Jemen rial','Yemen'),
('ZAR','South African rand','South Africa'),
('ZMW','Zambian kwacha','Zambia'),
('ZWL','Zimbabwe dollar','Zimbabwe');

UPDATE sys_currencies
SET enabled = true
WHERE iso = 'EUR';

UPDATE sys_currencies
SET enabled = true
WHERE iso = 'USD';

UPDATE sys_currencies
SET enabled = true
WHERE iso = 'NOK';

UPDATE sys_currencies
SET enabled = true
WHERE iso = 'DKK';

UPDATE sys_currencies
SET enabled = true
WHERE iso = 'SEK';

CREATE POLICY "PUBLIC — Select"
  ON public.sys_currencies
  FOR SELECT USING (true);