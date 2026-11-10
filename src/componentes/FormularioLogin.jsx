import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { entrar, entrarComProvedor, solicitarRecuperacao } from '../services/authService'
import { mensagemErro } from '../lib/supabase'
import '../styles/FormularioLogin.css';

function FormularioLogin() {
    const [email, setEmail] = useLocalStorage('malagon-email', '');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [aviso, setAviso] = useState('');

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
            await entrar(email, senha);
        } catch (e) {
            setErro(mensagemErro(e));
        } finally {
            setCarregando(false);
        }
    }

    async function aoEntrarComProvedor(provedor) {
        setErro('');
        setCarregando(true);
        try {
            await entrarComProvedor(provedor);
        } catch (erro) {
            setErro(mensagemErro(erro));
        } finally {
            setCarregando(false);
        }
    }

    async function aoRecuperarSenha(evento) {
        evento.preventDefault();
        setErro('');
        setAviso('');
        if (!email.trim()) {
            setErro('Preencha seu e-mail para recuperar a senha.');
            return;
        }
        setCarregando(true);
        try {
            await solicitarRecuperacao(email);
            setAviso('Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha.');
        } catch (erro) {
            setErro(mensagemErro(erro));
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
                        <label htmlFor="login-email">E-mail Acadêmico ou Pessoal</label>
                        <input
                            id="login-email"
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
                            <label htmlFor="login-senha">Senha</label>
                            <a href="#" className="esqueci-link" onClick={aoRecuperarSenha}>Esqueceu a senha?</a>
                        </div>
                        <input
                            id="login-senha"
                            type="password"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    {aviso && <p role="status">{aviso}</p>}
                    {erro && <p className="msg-erro" role="alert">{erro}</p>}

                    <button type="submit" className="btn btn-primary" disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar na Plataforma →'}
                    </button>

                    {(import.meta.env.VITE_SUPABASE_GOOGLE_ENABLED === 'true' || import.meta.env.VITE_SUPABASE_GITHUB_ENABLED === 'true') && (
                        <div className="social-login">
                            {import.meta.env.VITE_SUPABASE_GOOGLE_ENABLED === 'true' && <button type="button" className="btn-social" onClick={() => aoEntrarComProvedor('google')} disabled={carregando}>Google</button>}
                            {import.meta.env.VITE_SUPABASE_GITHUB_ENABLED === 'true' && <button type="button" className="btn-social" onClick={() => aoEntrarComProvedor('github')} disabled={carregando}>GitHub</button>}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default FormularioLogin;