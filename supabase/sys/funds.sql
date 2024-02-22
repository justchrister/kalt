
drop table public."sys_funds";
create table public."sys_funds" (
    "ticker"                "tickers"                 not null   primary key,
    "name"                  text,
    "description"           text, 
    "state"                 "funds_state"             not null  default "inactive"
);

--- row level security
ALTER TABLE "sys_funds" ENABLE ROW LEVEL SECURITY;

insert into public."sys_funds" ("ticker", "name", "description", "state") values 
  ('art', 'Art Fund', 'The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in.', 'alfa'),
  ('ffe', 'Fossil-free energy', 'The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by', 'alfa'),
  ('ah', 'Affordable housing', '', 'beta'),
  ('smb', 'Small business', 'The small business fund invests in or lends money to businesses that are designed for profitability with a potential for stable growth.', 'beta'),
  ('vc', 'Venture capital', 'The venture capital fund invests in early stage startups with high growth potential, and a clear path to profitability.', 'inactive');

CREATE POLICY "PUBLIC — Select"
  ON public.sys_funds
  FOR SELECT USING (true);