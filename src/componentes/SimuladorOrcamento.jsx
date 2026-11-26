function SimuladorOrcamento({ pais, orcamento, setOrcamento, duracao, setDuracao }) {
  const total = pais.total * duracao
  const sustentabilidade = orcamento * duracao >= total

  return (
    <section className="financeiro-card simulador-card">
      <div className="financeiro-card-topo">
        <span className="financeiro-sobretitulo">INTERACTIVE SIMULATOR</span>
        <span className="status-calculo"><span aria-hidden="true">●</span> CÁLCULO AO VIVO</span>
      </div>
      <h2>Teste a sustentabilidade do seu orçamento</h2>
      <label className="controle-simulador" htmlFor="orcamento-mensal">
        <span className="controle-titulo">
          <span>Orçamento estimado</span>
          <strong>{pais.moeda} {orcamento.toLocaleString('pt-BR')}</strong>
        </span>
        <input
          id="orcamento-mensal"
          type="range"
          min="500"
          max="5000"
          step="100"
          value={orcamento}
          onChange={(evento) => setOrcamento(Number(evento.target.value))}
          style={{ '--progresso': `${((orcamento - 500) / 4500) * 100}%` }}
        />
        <span className="limites-controle"><span>{pais.moeda}500</span><span>{pais.moeda}5.000</span></span>
      </label>
      <label className="controle-simulador" htmlFor="duracao-intercambio">
        <span className="controle-titulo">
          <span>Duração</span>
          <strong className="duracao-valor">{duracao} {duracao === 1 ? 'mês' : 'meses'}</strong>
        </span>
        <input
          id="duracao-intercambio"
          type="range"
          min="1"
          max="24"
          step="1"
          value={duracao}
          onChange={(evento) => setDuracao(Number(evento.target.value))}
          style={{ '--progresso': `${((duracao - 1) / 23) * 100}%` }}
        />
        <span className="limites-controle"><span>1 mês</span><span>24 meses</span></span>
      </label>
      <div className={`resultado-simulacao ${sustentabilidade ? 'resultado-positivo' : 'resultado-atencao'}`} role="status">
        <span>{sustentabilidade ? 'Orçamento sustentável' : 'Orçamento abaixo da estimativa'}</span>
        <strong>{pais.moeda} {total.toLocaleString('pt-BR')},00</strong>
        <small>Estimativa total para {duracao} {duracao === 1 ? 'mês' : 'meses'}</small>
      </div>
    </section>
  )
}

export default SimuladorOrcamento
