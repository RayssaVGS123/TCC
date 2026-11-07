import '../styles/CardUniversidades.css'

function CardUniversidade({ universidade, favoritada, onFavoritar }) {
  return (
    <article className="universidade-card">
      <div className="universidade-imagem-wrap">
        <img
          className="universidade-imagem"
          src={universidade.imagem}
          alt={`Campus da ${universidade.nome}`}
          loading="lazy"
        />
        <button
          type="button"
          className={`favoritar-btn ${favoritada ? 'favoritada' : ''}`}
          onClick={() => onFavoritar(universidade.id)}
          aria-label={favoritada ? `Remover ${universidade.nome} dos favoritos` : `Adicionar ${universidade.nome} aos favoritos`}
          aria-pressed={favoritada}
          title={favoritada ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {favoritada ? '♥' : '♡'}
        </button>
      </div>
      <div className="universidade-conteudo">
        <span className="universidade-pais">{universidade.pais}</span>
        <h2>{universidade.nome}</h2>
        <p>{universidade.descricao}</p>
        <a className="universidade-link" href={universidade.site} target="_blank" rel="noreferrer">
          Conhecer universidade <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

export default CardUniversidade
