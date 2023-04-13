

create table
  public.languages (
    iso6393 text not null,
    name text null,
    available boolean null default false,
    constraint languages_pkey primary key (iso6393)
  ) tablespace pg_default;


--- add row level security
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_select"
ON public.languages
FOR SELECT 
TO authenticated 
USING (
  true
);

insert into public.languages (iso6393,name,available) 
values ('NOR', 'Norwegian', true) ;


insert into public.languages (iso6393,name,available) 
values ('ENG', 'English', true);

insert into public.languages (iso6393,name,available)
values ('GER', 'German', true);