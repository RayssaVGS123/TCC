
import "../styles/Login.css";

function Login() {
    return (
        <div className="login-page">

            <div className="login-card">

                

                <p className="subtitulo">
                    Entre na sua conta
                </p>

                <form>

                    <div className="campo">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu e-mail"
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>

                </form>

                <p className="cadastro">
                    Ainda não possui uma conta?
                    <a href="#"> Criar conta</a>
                </p>

            </div>

        </div>
    );
}

export default Login;

