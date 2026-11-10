import { useState } from 'react'
import { sair } from '../services/authService'
import Hero from "../componentes/Hero";
import Universidades from './universidades.jsx'
import '../styles/PaginaInicial.css'

function PaginaInicial({ usuario }) {
  const [erro, setErro] = useState('')
  const [saindo, setSaindo] = useState(false)
  async function aoSair() {
    setSaindo(true)
    try { await sair() } catch { setErro('Não foi possível sair. Tente novamente.') } finally { setSaindo(false) }
  }
  const [paginaSelecionada, setPaginaSelecionada] = useState('inicio')

  return (
    <div className="pagina-aplicacao">
      <header className="navbar-principal">
        <a
          className="navbar-marca"
          href="#inicio"
          onClick={(evento) => {
            evento.preventDefault()
            setPaginaSelecionada('inicio')
          }}
        >
          Malagon
        </a>
        <nav className="navbar-links" aria-label="Navegação principal">
          <button
            type="button"
            className={paginaSelecionada === 'inicio' ? 'ativo' : ''}
            aria-current={paginaSelecionada === 'inicio' ? 'page' : undefined}
            onClick={() => setPaginaSelecionada('inicio')}
          >
            Início
          </button>
          <button
            type="button"
            className={paginaSelecionada === 'universidades' ? 'ativo' : ''}
            aria-current={paginaSelecionada === 'universidades' ? 'page' : undefined}
            onClick={() => setPaginaSelecionada('universidades')}
          >
            Universidades
          </button>
          <button type="button" onClick={aoSair} disabled={saindo}>{saindo ? 'Saindo...' : 'Sair'}</button>
        </nav>
      </header>
      {erro && <p role="alert">{erro}</p>}
      {paginaSelecionada === 'inicio' ? <Hero /> : <Universidades usuarioId={usuario.id} />}
    </div>
  )

}

export default PaginaInicial