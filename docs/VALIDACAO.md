# Validação realizada

## Fluxo conferido

Cadastro/login na interface → Supabase Auth → sessão → consulta ao catálogo e às favoritas → gravação/remoção → atualização da tela.

## Resultados

- `npm run lint`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.
- Chromium com Playwright, usando a aplicação real e respostas simuladas dos endpoints Supabase: cadastro enviado, senha incorreta bloqueada, login válido, leitura do catálogo, inclusão/remoção de favoritas, sessão restaurada ao recarregar e saída. Nenhum erro JavaScript de execução foi registrado.
- SQL executado em PostgreSQL local com PGlite, criando um esquema mínimo de autenticação para simular `auth.users` e `auth.uid()`: script executável duas vezes, cinco universidades, gatilho de perfis, chave composta impedindo duplicatas, consulta/alteração de dados de outra conta bloqueada por RLS, catálogo protegido contra escrita e consulta anônima bloqueada.

## Pendente no projeto real

A URL e a chave pública do projeto real foram configuradas. O endpoint de configuração do Auth respondeu HTTP 200, e o catálogo existente recusou consultas anônimas conforme esperado. Ainda não foi validado um fluxo completo com uma conta real: criação de contas reais, entrega de e-mails, links de confirmação/recuperação, OAuth opcional e persistência no projeto remoto. Os testes locais e com API simulada não substituem essa etapa. Siga o roteiro de `APRESENTACAO.md` depois da configuração.
