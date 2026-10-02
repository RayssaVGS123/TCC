import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
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
                        <button type="button" className="btn-social">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"/> Google
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