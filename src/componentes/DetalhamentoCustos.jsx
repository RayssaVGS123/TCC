function DetalhamentoCustos({ pais }) {
  const despesas = [
    { icone: '🏠', nome: 'Moradia', valor: pais.custos.moradia },
    { icone: '🍽️', nome: 'Alimentação', valor: pais.custos.alimentacao },
    { icone: '🚌', nome: 'Transporte', valor: pais.custos.transporte },
    { icone: '📚', nome: 'Materiais', valor: pais.custos.materiais },
    { icone: '🎭', nome: 'Lazer', valor: pais.custos.lazer },
  ]

  return (
    <section className="financeiro-card">
      <div className="financeiro-card-topo">
        <span className="financeiro-sobretitulo">EXPENSE BREAKDOWN</span>
        <span className="financeiro-etiqueta">{pais.codigo} {pais.nome}</span>
      </div>
      <ul className="lista-despesas">
        {despesas.map((despesa) => (
          <li key={despesa.nome}>
            <span className="despesa-nome"><span aria-hidden="true">{despesa.icone}</span>{despesa.nome}</span>
            <strong>{pais.moeda} {despesa.valor.toLocaleString('pt-BR')},00</strong>
          </li>
        ))}
      </ul>
      <div className="financeiro-total">
        <span>Custo mensal estimado</span>
        <strong>{pais.moeda} {pais.total.toLocaleString('pt-BR')},00</strong>
      </div>
      <p className="financeiro-fonte">Estimativas mensais para um estudante. Valores ilustrativos.</p>
    </section>
  )
}

export default DetalhamentoCustos
