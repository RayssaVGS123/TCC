# Malagon — planejamento de intercâmbio

Aplicação React com Vite. Cadastro e login usam Supabase Auth; os dados ficam no PostgreSQL do Supabase.

## Configuração da apresentação

O arquivo `.env.production` já aponta para o projeto Supabase informado pela equipe. Ele contém apenas a URL e a chave pública, próprias para uso no navegador. As políticas do banco continuam obrigatórias. Para usar outro projeto, configure as variáveis na hospedagem ou substitua esse arquivo com os dados públicos do novo projeto.

## Configurar o Supabase

1. Crie um projeto em https://supabase.com/dashboard. Guarde a senha do banco em local privado.
2. Abra **SQL Editor**, crie uma consulta, cole todo o conteúdo de `supabase/schema.sql` e execute. Faça isso antes de cadastrar usuários.
3. Em **Authentication > Providers > Email**, habilite cadastro por e-mail. O código exige senha de pelo menos 8 caracteres; configure o mesmo mínimo no provedor.
4. Em **Authentication > URL Configuration**, configure a **Site URL** com a URL em que você abrirá o site e inclua essa URL em **Redirect URLs**. Para desenvolvimento: `http://localhost:5173`. Para uma publicação, inclua o endereço publicado.
5. Copie a **Project URL** e a chave **publishable** (ou a chave pública legada `anon`) do painel de conexão/API.
6. Copie `.env.example` para `.env.local` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. Nunca coloque senha do banco, chave `secret` ou `service_role` no frontend.
7. Instale e execute:

```bash
npm ci
npm run dev
```

Use Node.js 22.12 ou superior. Depois de alterar variáveis, reinicie o servidor. Para publicar em uma hospedagem estática, configure as mesmas variáveis no painel, use `npm run build` e publique a pasta `dist`.

## Confirmação e recuperação de senha

Com confirmação de e-mail ativa, o usuário deve abrir o link recebido antes do primeiro login. O serviço de e-mails padrão do Supabase tem limites: configure SMTP próprio para uso real. Para uma demonstração controlada, você pode desativar a confirmação de e-mail nas configurações do provedor Email; nesse caso o cadastro pode abrir a sessão imediatamente. Não use e-mails ou dados pessoais de terceiros nos testes.

O link **Esqueceu a senha?** usa o e-mail preenchido. O link recebido abre o formulário de nova senha na aplicação. Cadastre corretamente a URL de redirecionamento para esse fluxo funcionar.

## Login social opcional

Google e GitHub usam o próprio Supabase Auth. Os botões ficam ocultos inicialmente. Para ativá-los, configure o respectivo provedor no Supabase, com credenciais OAuth próprias e a callback URL indicada pelo painel; depois defina `VITE_SUPABASE_GOOGLE_ENABLED=true` ou `VITE_SUPABASE_GITHUB_ENABLED=true` e reinicie/republique. Não é necessário Firebase.

## O que foi conectado

- Cadastro real por e-mail e senha, com nome e perfil acadêmico.
- Login validado, restauração da sessão, recuperação de senha e saída.
- Catálogo de universidades consultado do banco.
- Favoritas vinculadas ao usuário, persistentes após sair e entrar.
- Mensagens de erro e carregamento, sem anunciar gravação antes da confirmação do servidor.

A tela inicial ainda contém textos e números ilustrativos. Simulação de custos, organização de vistos e compatibilidade por IA não foram implementadas no projeto original e não são funcionalidades entregues por esta integração. As imagens das universidades dependem de URLs externas já existentes no projeto.

## Estrutura

- `src/lib/supabase.js`: cria o cliente usando a URL e a chave pública.
- `src/services/authService.js`: cadastro, login, OAuth, recuperação e saída.
- `src/services/usuarioService.js`: consulta e atualização do próprio perfil.
- `src/services/universidadeService.js`: consultas e gravação de favoritas.
- `src/App.jsx`: acompanha a sessão e decide entre login e área autenticada.
- `src/pages/universidades.jsx`: carrega o catálogo e as favoritas.
- `supabase/schema.sql`: tabelas, relacionamentos, gatilho, políticas e catálogo inicial.
- `docs/APRESENTACAO.md`: roteiro de explicação e teste.

## Conferir

```bash
npm run lint
npm run build
```

Depois execute os testes manuais do roteiro com um projeto Supabase configurado. A compilação sozinha não comprova acesso ao banco.
