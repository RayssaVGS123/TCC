import { useState } from 'react'
import DetalhamentoCustos from '../componentes/DetalhamentoCustos.jsx'
import SimuladorOrcamento from '../componentes/SimuladorOrcamento.jsx'
import '../styles/Financeiro.css'

const paises = [
  {
    id: 'espanha',
    nome: 'Espanha (Málaga) — base',
    codigo: 'ES',
    moeda: '€',
    total: 895,
    custos: { moradia: 550, alimentacao: 250, transporte: 45, materiais: 20, lazer: 30 },
  },
  {
    id: 'portugal',
    nome: 'Portugal (Lisboa)',
    codigo: 'PT',
    moeda: '€',
    total: 1040,
    custos: { moradia: 650, alimentacao: 260, transporte: 55, materiais: 25, lazer: 50 },
  },
  {
    id: 'alemanha',
    nome: 'Alemanha (Berlim)',
    codigo: 'DE',
    moeda: '€',
    total: 1280,
    custos: { moradia: 800, alimentacao: 280, transporte: 70, materiais: 35, lazer: 95 },
  },
]

function Financeiro() {
  const [paisId, setPaisId] = useState('espanha')
  const [orcamento, setOrcamento] = useState(1500)
  const [duracao, setDuracao] = useState(12)
  const pais = paises.find((item) => item.id === paisId) ?? paises[0]

  return (
    <main className="financeiro-pagina">
      <div className="financeiro-cabecalho">
        <div>
          <span className="financeiro-sobretitulo">FINANCIAL SIMULATION &amp; BREAKDOWN</span>
          <h1>Análise de Custos</h1>
        </div>
        <aside className="cartao-cambio" aria-label="Cotação cambial">
          <span>CÂMBIO BRL/EUR</span>
          <strong>—</strong>
          <small>erro ao carregar</small>
        </aside>
      </div>

      <div className="seletor-pais">
        <label htmlFor="pais-financeiro">Simular custos para outro país:</label>
        <select id="pais-financeiro" value={paisId} onChange={(evento) => setPaisId(evento.target.value)}>
          {paises.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
        </select>
        <span className="fonte-dados">Dados do Banco Mundial · 2023</span>
      </div>

      <div className="financeiro-grade">
        <DetalhamentoCustos pais={pais} />
        <SimuladorOrcamento
          pais={pais}
          orcamento={orcamento}
          setOrcamento={setOrcamento}
          duracao={duracao}
          setDuracao={setDuracao}
        />
      </div>
    </main>
  )
}

export default Financeiro
