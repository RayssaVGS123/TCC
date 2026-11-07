import { useState } from 'react'
import Hero from "../componentes/Hero";
import Universidades from './universidades.jsx'
import '../styles/PaginaInicial.css'

function PaginaInicial() {
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
        </nav>
      </header>
      {paginaSelecionada === 'inicio' ? <Hero /> : <Universidades />}
    </div>
  )

}

export default PaginaInicial