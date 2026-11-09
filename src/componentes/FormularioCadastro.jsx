import { useState } from 'react';
import { cadastrar } from '../services/authService';
import { mensagemErro } from '../lib/supabase';
import '../styles/FormularioCadastro.css';

const dadosVazios = { nome: '', email: '', perfil: '', senha: '' };

function FormularioCadastro() {
    const [dados, setDados] = useState(dadosVazios);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    function aoMudar(e) {
        setDados((atual) => ({ ...atual, [e.target.name]: e.target.value }));
    }

    async function aoEnviar(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (dados.senha.length < 8) {
            setErro('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setCarregando(true);
        try {
            await cadastrar(dados);
            setSucesso('Solicitação recebida! Confira seu e-mail para confirmar a conta antes de entrar.');
            setDados(dadosVazios);
        } catch (erro) {
            setErro(mensagemErro(erro));
        } finally {
            setCarregando(false);
        }
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
                        <label htmlFor="cadastro-nome">Nome Completo</label>
                        <input type="text" id="cadastro-nome" name="nome" placeholder="Seu nome"
                            value={dados.nome} onChange={aoMudar} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="cadastro-email">E-mail</label>
                        <input type="email" id="cadastro-email" name="email" placeholder="seuemail@exemplo.com"
                            value={dados.email} onChange={aoMudar} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="cadastro-perfil">Perfil Acadêmico</label>
                        <select id="cadastro-perfil" name="perfil" required className="select-perfil"
                            value={dados.perfil} onChange={aoMudar}>
                            <option value="" disabled>Selecione seu objetivo...</option>
                            <option value="graduacao">Graduação no Exterior</option>
                            <option value="pos">Pós / Mestrado / Doutorado</option>
                            <option value="idioma">Curso de Idiomas</option>
                            <option value="pesquisa">Pesquisa / Estágio Tech</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="cadastro-senha">Senha</label>
                        <input type="password" id="cadastro-senha" name="senha" placeholder="Crie uma senha forte"
                            value={dados.senha} onChange={aoMudar} required />
                    </div>

                    {erro && <p className="msg-erro" role="alert">{erro}</p>}
                    {sucesso && <p className="msg-sucesso">{sucesso}</p>}

                    <button type="submit" className="btn btn-primary" disabled={carregando}>{carregando ? 'Criando conta...' : 'Criar Minha Conta →'}</button>
                </form>
            </div>
        </>
    );
}

export default FormularioCadastro;