import { useState } from 'react';
import '../styles/FormularioCadastro.css';

const dadosVazios = { nome: '', email: '', perfil: '', senha: '' };

function FormularioCadastro() {
    const [dados, setDados] = useState(dadosVazios);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    function aoMudar(e) {
        setDados((atual) => ({ ...atual, [e.target.name]: e.target.value }));
    }

    function aoEnviar(e) {
        e.preventDefault();
        setErro('');
        setSucesso(false);

        if (dados.senha.length < 8) {
            setErro('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        // TODO: enviar para a API (usuarioService.criar(dados))
        setSucesso(true);
        setDados(dadosVazios);
    }

    return (
        <>
            <div className="form-box cadastro">
                <form id="form-cadastro" onSubmit={aoEnviar}>
                    <div className="form-title">
                        <h2>Criar Conta Global</h2>
                        <p>Comece a planejar seu intercâmbio gratuitamente.</p>
                    </div>

                    <div className="input-box">
                        <label>Nome Completo</label>
                        <input type="text" name="nome" placeholder="Seu nome"
                            value={dados.nome} onChange={aoMudar} required />
                    </div>

                    <div className="input-box">
                        <label>E-mail</label>
                        <input type="email" name="email" placeholder="seuemail@exemplo.com"
                            value={dados.email} onChange={aoMudar} required />
                    </div>

                    <div className="input-box">
                        <label>Perfil Acadêmico</label>
                        <select name="perfil" required className="select-perfil"
                            value={dados.perfil} onChange={aoMudar}>
                            <option value="" disabled>Selecione seu objetivo...</option>
                            <option value="graduacao">Graduação no Exterior</option>
                            <option value="pos">Pós / Mestrado / Doutorado</option>
                            <option value="idioma">Curso de Idiomas</option>
                            <option value="pesquisa">Pesquisa / Estágio Tech</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label>Senha</label>
                        <input type="password" name="senha" placeholder="Crie uma senha forte"
                            value={dados.senha} onChange={aoMudar} required />
                    </div>

                    {erro && <p className="msg-erro" role="alert">{erro}</p>}
                    {sucesso && <p className="msg-sucesso">Conta criada! Agora é só entrar.</p>}

                    <button type="submit" className="btn btn-primary">Criar Minha Conta →</button>
                </form>
            </div>
        </>
    );
}

export default FormularioCadastro;