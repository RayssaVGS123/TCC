import { useState } from 'react'
import MapaRota from '../componentes/MapaRota.jsx'
import '../styles/Localizacao.css'

function Localizacao() {
  const [origem, setOrigem] = useState('São Paulo, Brasil')
  const [destino, setDestino] = useState('Lisboa, Portugal')
  const [confirmada, setConfirmada] = useState(false)

  function trocarCidades() {
    setOrigem(destino)
    setDestino(origem)
    setConfirmada(false)
  }

  return (
    <main className="localizacao-pagina">
      <section className="localizacao-intro">
        <h1>Configurações Locais</h1>
        <p>Informe seu país de origem e onde deseja ir para começar a simular.</p>
      </section>

      <div className="localizacao-conteudo">
        <section className="cartao-localizacao" aria-label="Seleção de origem e destino">
          <div className="rota-cidades">
            <label className="campo-cidade" htmlFor="cidade-origem">
              <span>ORIGEM</span>
              <input id="cidade-origem" value={origem} onChange={(evento) => { setOrigem(evento.target.value); setConfirmada(false) }} />
            </label>
            <button type="button" className="botao-trocar" onClick={trocarCidades} aria-label="Trocar origem e destino">↔</button>
            <label className="campo-cidade" htmlFor="cidade-destino">
              <span>DESTINO</span>
              <input id="cidade-destino" value={destino} onChange={(evento) => { setDestino(evento.target.value); setConfirmada(false) }} />
            </label>
          </div>
          <button
            type="button"
            className="botao-confirmar-localizacao"
            onClick={() => setConfirmada(true)}
            disabled={!origem.trim() || !destino.trim()}
          >
            Confirmar Seleção <span aria-hidden="true">⟶</span>
          </button>
          {confirmada && <p className="mensagem-localizacao" role="status">Rota definida: {origem} → {destino}</p>}
        </section>
        <MapaRota origem={origem} destino={destino} />
      </div>
    </main>
  )
}

export default Localizacao
