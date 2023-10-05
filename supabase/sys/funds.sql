create table public."sys_funds" (
    "ticker"               tickers                 not null   primary,
    "name"                 text,
    "description"          text
);


--- add row level security
ALTER TABLE "sys_funds" ENABLE ROW LEVEL SECURITY;

insert into public."sys_funds" ("ticker", "name", "description") values 
  ('gi.ddf', 'Global Index', 'true'),
  ('art.ddf', 'Art Fund', 'The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in.'),
  ('ffe.ddf', 'Fossil-free energy', 'The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by'),
  ('ah.ddf', 'Affordable housing', ''),
  ('vc.ddf', 'Venture capital', 'The venture capital fund invests in early stage startups with high growth potential, and a clear path to profitability.'),
  ('smb.ddf', 'Small and medium sized businesses', 'The small and medium sized businesses fund invests in small and medium sized businesses with high growth potential, and a clear path to profitability.');

CREATE POLICY "PUBLIC — Select"
  ON public.sys_funds
  FOR SELECT USING (true);