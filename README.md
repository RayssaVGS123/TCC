# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Login com Google

O botão Google usa Firebase Authentication. Para configurá-lo:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/) e adicione um app Web.
2. Em **Authentication > Sign-in method**, habilite o provedor **Google**.
3. Em **Authentication > Settings > Authorized domains**, confirme que `localhost` está autorizado para desenvolvimento.
4. Copie os valores da configuração do app Web para `.env.local`, na raiz do projeto. Use `.env.example` como modelo; não deixe os campos vazios.
5. Reinicie o Vite depois de salvar o arquivo: pare `npm run dev` com `Ctrl+C` e inicie novamente.

O login redireciona para a página inicial e o Firebase mantém a sessão entre recarregamentos. Erros de domínio não autorizado e provedor Google desativado aparecem no formulário. Em produção, adicione o domínio publicado à lista de domínios autorizados do Firebase.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
