# Roteiro para a apresentação

## Explicação em cerca de um minuto

“O Malagon usa React para mostrar as telas. Quando alguém cria uma conta, o frontend chama o Supabase Auth, que cuida das credenciais e da sessão. Um gatilho no banco cria automaticamente o perfil acadêmico ligado à conta. Depois do login, o aplicativo busca as universidades no PostgreSQL. Ao clicar no coração, gravamos ou removemos um registro na tabela de favoritas. Esse registro liga o usuário à universidade. As políticas de segurança do banco garantem que cada pessoa consulte e altere apenas seus próprios favoritos.”

## Como as tabelas se relacionam

| Tabela | Finalidade | Identificação e relacionamento |
| --- | --- | --- |
| `auth.users` | Contas administradas pelo Supabase Auth | UUID de cada conta |
| `perfis` | Nome e perfil acadêmico | `id` referencia `auth.users.id` |
| `universidades` | Catálogo de instituições | `id` identifica a universidade |
| `favoritos` | Universidades salvas por cada pessoa | `usuario_id` e `universidade_id` referenciam conta e universidade |

A chave primária de `favoritos` combina as duas referências: a mesma pessoa não consegue salvar duas vezes a mesma universidade. As chaves estrangeiras impedem referências inexistentes. `on delete cascade` remove os registros dependentes quando a conta ou a universidade é excluída.

## Como explicar os arquivos

1. `supabase.js` cria uma única conexão lógica com o serviço. A chave pública identifica o projeto; as permissões dependem da sessão e das políticas do banco.
2. `authService.js` reúne as chamadas de autenticação. `signUp` cria a conta e envia nome/perfil como metadados; `signInWithPassword` valida as credenciais; `signOut` encerra a sessão.
3. `App.jsx` escuta mudanças de autenticação com `onAuthStateChange`, restaura a sessão com `getSession` e remove a inscrição quando o componente é desmontado. A tela interna só aparece quando existe uma sessão.
4. `FormularioCadastro.jsx` valida o tamanho da senha, aguarda a resposta do serviço e mostra o resultado. `FormularioLogin.jsx` autentica e trata erros em português.
5. `universidadeService.js` usa `select`, `insert` e `delete`. Cada chamada verifica `error`; a tela só muda o coração depois que a operação dá certo.
6. `universidades.jsx` usa `useEffect` para buscar os dados ao abrir a tela e `useState` para atualizar a interface. Uma trava evita cliques repetidos enquanto uma gravação está em andamento.
7. `schema.sql` define a estrutura. O gatilho `ao_criar_usuario` cria o perfil na mesma transação da conta. A função usa `security definer` com caminho de busca restrito e nomes completos das tabelas.

## Perguntas que podem aparecer

**Onde fica a senha?** No sistema de autenticação do Supabase, que administra seu armazenamento seguro. Não criamos coluna de senha em `perfis` nem gravamos a senha no localStorage.

**Por que não salvar favoritas no localStorage?** Ele pertence ao navegador e não acompanha a pessoa em outro dispositivo. No banco, as favoritas ficam associadas à conta.

**O que é RLS?** Row Level Security, ou segurança por linha. As políticas comparam `auth.uid()` com o ID do dono do registro. Mesmo que alguém altere a requisição no navegador, o banco aplica essa regra.

**Esconder a tela já protege os dados?** Não. A proteção efetiva vem das permissões e políticas do banco. A condição de sessão no React controla a experiência da interface.

**O que é assíncrono?** Uma operação que aguarda uma resposta sem bloquear o navegador. Usamos `async/await`, estados de carregamento e tratamento de erros.

**A IA e as simulações estão funcionando?** Ainda não: os indicadores da página inicial são ilustrativos. O fluxo implementado nesta etapa é autenticação, catálogo e favoritas persistentes.

## Demonstração e conferência antes de apresentar

1. Execute o SQL em um projeto novo. Configure URL, chave pública e redirecionamentos.
2. Crie a conta A com um e-mail seu e senha de teste. Confirme o e-mail se essa opção estiver ativa.
3. Confira em Authentication que a conta existe; confira no Table Editor que `perfis` contém o nome e o perfil.
4. Saia. Tente entrar com senha incorreta: a área interna deve continuar bloqueada.
5. Entre com a senha correta. Abra Universidades: o catálogo deve vir do banco.
6. Favorite uma universidade. Confira o registro em `favoritos` no painel.
7. Recarregue a página e volte à aba Universidades: o coração deve continuar marcado. Saia e entre: deve permanecer salvo.
8. Crie a conta B, usando outro e-mail seu. Ela deve começar sem favoritas. Salve outra universidade e confirme que isso não altera os dados da conta A.
9. Volte à conta A, remova a favorita e recarregue: ela deve continuar removida.
10. Teste a recuperação de senha com seu e-mail, abra o link, defina uma nova senha e valide o próximo login.

Para provar o isolamento, além de conferir a interface, faça uma requisição autenticada pela conta B tentando consultar/gravar o ID da conta A: a consulta deve retornar vazia e a inserção deve ser recusada pela política. O Table Editor administrativo não representa as permissões de um usuário comum.

Antes de apresentar, mantenha uma conta confirmada pronta e teste a internet. Não exiba senhas ou chaves secretas na projeção.
