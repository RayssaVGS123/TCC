function Main({ produtos, aoAdicionar }) {
    return (
        <main>
            <h1>Cardapio</h1>
            <section>
                {produtos.map((produto) => (
                    <article key={produto.id}>
                        <h2>{produto.nome}</h2>
                        <p>{produto.descricao}</p>
                        <strong>R$ {produto.preco.toFixed(2).replace('.', ',')}</strong>
                        <button type="button" onClick={() => aoAdicionar(produto)}>
                            Adicionar ao carrinho
                        </button>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Main;