import { useState } from 'react';
import Main from '../componentes/Main';
import Header from '../componentes/Header';

const produtosIniciais = [
    { id: 1, nome: 'Hamburguer artesanal', descricao: 'Pao, carne, queijo e salada', preco: 24.9 },
    { id: 2, nome: 'Batata frita', descricao: 'Porcao crocante individual', preco: 12.5 },
    { id: 3, nome: 'Refrigerante', descricao: 'Lata de 350 ml', preco: 6.0 },
];

function Home() {
    const [carrinho, setCarrinho] = useState([]);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    function adicionarAoCarrinho(produto) {
        setCarrinho((itens) => [...itens, produto]);
    }

    return (
        <>
            <Header
                nomeLoja="Seu delivery"
                quantidadeCarrinho={carrinho.length}
                aoAbrirCarrinho={() => setCarrinhoAberto(true)}
            />

            {carrinhoAberto && (
                <aside>
                    <button type="button" onClick={() => setCarrinhoAberto(false)}>
                        Fechar carrinho
                    </button>
                    <h2>Seu carrinho</h2>
                    {carrinho.length === 0 ? (
                        <p>Seu carrinho esta vazio.</p>
                    ) : (
                        <ul>
                            {carrinho.map((produto, indice) => (
                                <li key={`${produto.id}-${indice}`}>{produto.nome}</li>
                            ))}
                        </ul>
                    )}
                </aside>
            )}

            <Main produtos={produtosIniciais} aoAdicionar={adicionarAoCarrinho} />
        </>
    );
}

export default Home;
 