create table public."sys_funds" (
    "ticker"               "tickers"                 not null   primary key,
    "name"                 text,
    "description"          text
);


--- row level security
ALTER TABLE "sys_funds" ENABLE ROW LEVEL SECURITY;

insert into public."sys_funds" ("ticker", "name", "description") values 
  ('art', 'Art Fund', 'The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in.'),
  ('ffe', 'Fossil-free energy', 'The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by'),
  ('ah', 'Affordable housing', ''),
--  ('smb', 'Small and medium sized businesses', 'The small and medium sized businesses fund invests in small and medium sized businesses with high growth potential, and a clear path to profitability.'),
  ('vc', 'Venture capital', 'The venture capital fund invests in early stage startups with high growth potential, and a clear path to profitability.');

CREATE POLICY "PUBLIC — Select"
  ON public.sys_funds
  FOR SELECT USING (true);