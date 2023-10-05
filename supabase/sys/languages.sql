create table public."sys_languages" (
    iso           text        not null,
    name          text,
    available     boolean                 default false
);


--- add row level security
ALTER TABLE "sys_languages" ENABLE ROW LEVEL SECURITY;

insert into public."sys_languages" (iso, name, available) values 
  ('NOR', 'Norwegian', true),
  ('ENG', 'English', true),
  ('GER', 'German', true);

CREATE POLICY "AUTH — Select"
  ON public."sys_languages"
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "PUBLIC — Select"
  ON public."sys_languages"
  AS PERMISSIVE FOR SELECT
  TO public
  WITH CHECK (true);