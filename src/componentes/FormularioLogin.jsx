import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { entrarComGoogle } from '../services/firebaseAuth.js'
import '../styles/FormularioLogin.css';

function FormularioLogin({ onLogin }) {
    const [email, setEmail] = useLocalStorage('malagon-email', '');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const campoEmail = useRef(null);

    useEffect(() => {
        campoEmail.current?.focus();
    }, []);

    async function aoEnviar(event) {
        event.preventDefault();
        setErro('');

        if (!email.trim() || !senha) {
            setErro('Preencha o e-mail e a senha.');
            return;
        }

        setCarregando(true);
        try {
            // TODO: trocar pela chamada real da API de login
            await new Promise((resolve) => setTimeout(resolve, 500));
            onLogin();
        } catch (e) {
            setErro(e.message || 'Não foi possível entrar. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    }

    async function aoEntrarComGoogle() {
        setErro('');
        setCarregando(true);

        try {
            await entrarComGoogle();
            onLogin();
        } catch (e) {
            const mensagens = {
                'firebase/config-missing': e.message,
                'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase Authentication.',
                'auth/operation-not-allowed': 'Ative o provedor Google em Authentication > Sign-in method no Firebase.',
                'auth/popup-blocked': 'O navegador bloqueou a janela de login. Permita pop-ups e tente novamente.',
                'auth/popup-closed-by-user': 'A janela de login foi fechada antes da conclusão.',
                'auth/cancelled-popup-request': 'Já existe uma solicitação de login aberta.',
                'auth/network-request-failed': 'Falha de conexão. Verifique a internet e tente novamente.',
                'auth/invalid-api-key': 'A chave da API do Firebase está inválida. Confira o arquivo .env.local.'
            };
            setErro(mensagens[e.code] || 'Não foi possível entrar com Google. Verifique a configuração do Firebase.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <div className="form-box login">
                <form id="form-login" onSubmit={aoEnviar}>
                    <div className="form-title">
                        <h2>Acesse sua Conta</h2>
                        <p>Entre para acompanhar simulações e vistos salvos.</p>
                    </div>

                    <div className="input-box">
                        <label>E-mail Acadêmico ou Pessoal</label>
                        <input
                            ref={campoEmail}
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <div className="label-row">
                            <label>Senha</label>
                            <a href="#" className="esqueci-link">Esqueceu a senha?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    {erro && <p className="msg-erro" role="alert">{erro}</p>}

                    <button type="submit" className="btn btn-primary" disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar na Plataforma →'}
                    </button>

                    <div className="divisor">
                        <span>ou entre com</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="btn-social" onClick={aoEntrarComGoogle} disabled={carregando}>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt=""/> {carregando ? 'Conectando...' : 'Google'}
                        </button>
                        <button type="button" className="btn-social">
                            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"/> GitHub
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormularioLogin;