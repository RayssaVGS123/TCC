-- Execute este arquivo completo no SQL Editor de um projeto novo do Supabase.
begin;

create table if not exists public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null check (char_length(nome) between 1 and 120),
  perfil text not null check (perfil in ('graduacao', 'pos', 'idioma', 'pesquisa')),
  criado_em timestamptz not null default now()
);

create table if not exists public.universidades (
  id bigint primary key,
  nome text not null,
  pais text not null,
  descricao text not null,
  imagem text not null,
  site text not null
);

create table if not exists public.favoritos (
  usuario_id uuid not null references auth.users(id) on delete cascade,
  universidade_id bigint not null references public.universidades(id) on delete cascade,
  criado_em timestamptz not null default now(),
  primary key (usuario_id, universidade_id)
);

-- O perfil é criado junto com a conta; senhas ficam sob responsabilidade do Auth.
create or replace function public.criar_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfis (id, nome, perfil)
  values (
    new.id,
    left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'nome'), ''), nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Estudante'), 120),
    case when new.raw_user_meta_data ->> 'perfil' in ('graduacao', 'pos', 'idioma', 'pesquisa')
      then new.raw_user_meta_data ->> 'perfil' else 'graduacao' end
  );
  return new;
end;
$$;
revoke all on function public.criar_perfil() from public, anon, authenticated;
drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario after insert on auth.users
for each row execute function public.criar_perfil();

alter table public.perfis enable row level security;
alter table public.universidades enable row level security;
alter table public.favoritos enable row level security;

revoke all on public.perfis, public.universidades, public.favoritos from anon, authenticated;
grant select on public.perfis, public.universidades, public.favoritos to authenticated;
grant update (nome, perfil) on public.perfis to authenticated;
grant insert, delete on public.favoritos to authenticated;

drop policy if exists "Consultar próprio perfil" on public.perfis;
create policy "Consultar próprio perfil" on public.perfis for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "Atualizar próprio perfil" on public.perfis;
create policy "Atualizar próprio perfil" on public.perfis for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "Consultar universidades" on public.universidades;
create policy "Consultar universidades" on public.universidades for select to authenticated using (true);
drop policy if exists "Consultar próprias favoritas" on public.favoritos;
create policy "Consultar próprias favoritas" on public.favoritos for select to authenticated using ((select auth.uid()) = usuario_id);
drop policy if exists "Salvar próprias favoritas" on public.favoritos;
create policy "Salvar próprias favoritas" on public.favoritos for insert to authenticated with check ((select auth.uid()) = usuario_id);
drop policy if exists "Remover próprias favoritas" on public.favoritos;
create policy "Remover próprias favoritas" on public.favoritos for delete to authenticated using ((select auth.uid()) = usuario_id);

-- Catálogo inicial de universidades exibidas pelo projeto.
insert into public.universidades (id, nome, pais, descricao, imagem, site) values
('1', 'University of Edinburgh', 'Edimburgo, Escócia', 'Oferece formação em Ciência da Computação e Informática.', 'https://images.openai.com/static-rsc-4/cey4yq4B4e8zxJ_NwVWDscKwNdMcvJFAmcF4pojI-DSlDqg2g1tE91cpRyhBG48NUKdcxh1f-gqMm1oM8O34C3LLUds-sSecYnbrsMfTlN1tbn0FsDln2sddmNGgoQH0sSAOhXnjXVuNQ2_0ECCo0GQBdIKFG_R25GbMo7AVVS_y6s8HQtqlBZmOG37Nnhkf?purpose=fullsize', 'https://www.ed.ac.uk/'),
('2', 'University of Surrey', 'Guildford, Inglaterra', 'Possuí cursos de Ciência da Computação, Inteligência Artificial, Ciência de Dados e Cibersegurança.', 'https://images.openai.com/static-rsc-4/y6aStQvCWu2T5T5pH-hG9iEYq3oT3qj_QE3FkU5BKSuzP3jColfHx2Dtpo38mfeYcsFdXnE7g46Hi_UBRVeHki0OKpkdIZnQqwHGoznJXGnvhQdin-jyCAHvTWTdzjSLFHiCDeWn2Z9kAtWZyS9K44VrT2tGCQIoVgO3kX6v3q82PowxGMhaFb_rXzF_SxSY?purpose=fullsize', 'https://www.surrey.ac.uk/'),
('3', 'University of York', 'York, Inglaterra', 'Universidade pública reconhecida pela qualidade do ensino, pesquisa e ambiente internacional.', 'https://images.openai.com/static-rsc-4/TvrNnY74vyYkEeprQnHPRuzWFMlEXqjeBVT2FV497WcmIfx5lWNdPLvpjigDezM9qapbzyFCqc19Bbi7hYGm-pAB4XPwpvsKsgrHzHgsWolnuGZGDxFpBWfSDIx8GHnkPXqoQ7WhFGJGdhIKt6Df420Le6KvPYEZnu4R_OdK_YTtXcHg8mxn8kltrJcp7DPz?purpose=fullsize', 'https://www.york.ac.uk/computer-science/study/?utm_source=chatgpt.com'),
('4', 'New York University(NYU)', 'Brooklyn e Manhattan, Nova York', 'Destaque em tecnologia, arquitetura, engenharia e projetos aplicados ao mercado.', 'https://images.openai.com/static-rsc-4/PTl48Dkkfhdjw_t5gO8GaVSwalL9O7NnqWSHdk6_gACPPEFWdsT9J47VW2yA1cVB1ETDZ-jgjCMqgAEdsnqSDaG9hmHqb1xta99JCk1z--lVxbHe2pF11kHcx-G47SKoLYGDCn8rb83aM37TM3aJ5HWthnx955jnuTmtUVYG-Yf9LkEMkjiAHDdcNkA-LhNs?purpose=fullsize', 'https://engineering.nyu.edu/'),
('5', 'Universidade do Porto', 'Porto, Portugal', 'Ciência da Computação, programação, bancos de dados, sistemas e desenvolvimento web e mobile.', 'https://images.openai.com/static-rsc-4/saahZM8DkdRJfmzNtOp_gcm0akY1DoGn44ss5tIX0JdClqJqtV8nwXz3VzdnlJHa6DW7U9Tbw-vAk1N69Gf3kNIdD3DE_T-6HWJoSUuKlssHelqFNgxf8cZKPoEdQv60qSkLzYJBaRZN4dwunp1-H9lD5LV97xeh8Qgr4de1VGVG_anEiptjPdQNMOSw1I23?purpose=fullsize', 'https://www.up.pt/portal/en/')
on conflict (id) do update set nome = excluded.nome, pais = excluded.pais, descricao = excluded.descricao, imagem = excluded.imagem, site = excluded.site;

commit;
