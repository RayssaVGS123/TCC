import { useEffect, useRef, useState } from 'react'
import CardUniversidade from '../componentes/CardUniversidades.jsx'
import { listarUniversidades, listarFavoritos, salvarFavorito } from '../services/universidadeService'
import '../styles/Universidades.css'


function Universidades({ usuarioId }) {
  const [universidades, setUniversidades] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const emGravacao = useRef(false)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    Promise.all([listarUniversidades(), listarFavoritos(usuarioId)])
      .then(([lista, salvos]) => {
        if (ativo) { setUniversidades(lista); setFavoritos(salvos) }
      })
      .catch(() => { if (ativo) setErro('Não foi possível carregar os dados. Confira a conexão e a configuração do banco.') })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [usuarioId, tentativa])

  async function alternarFavorito(id) {
    if (emGravacao.current) return
    emGravacao.current = true
    setSalvando(true)
    setErro('')
    try {
      const remover = favoritos.includes(id)
      await salvarFavorito(usuarioId, id, remover)
      setFavoritos((atuais) => remover ? atuais.filter((item) => item !== id) : [...atuais, id])
    } catch {
      setErro('Não foi possível salvar a alteração. Tente novamente.')
    } finally {
      emGravacao.current = false
      setSalvando(false)
    }
  }

  const universidadesExibidas = mostrarFavoritos
    ? universidades.filter((universidade) => favoritos.includes(universidade.id))
    : universidades

  return (
    <main className="universidades-pagina">
      <section className="universidades-intro">
        <span className="universidades-etiqueta">SUA JORNADA ACADÊMICA</span>
        <h1>Encontre sua próxima <span>universidade</span></h1>
        <p>Explore universidades e salve as opções que combinam com seus planos de intercâmbio.</p>
      </section>

      <div className="universidades-toolbar">
        <div>
          <h2>{mostrarFavoritos ? 'Suas favoritas' : 'Universidades em destaque'}</h2>
          <p>{universidadesExibidas.length} {universidadesExibidas.length === 1 ? 'instituição' : 'instituições'} para explorar</p>
        </div>
        <button
          type="button"
          className={`filtro-favoritos ${mostrarFavoritos ? 'selecionado' : ''}`}
          onClick={() => setMostrarFavoritos((valor) => !valor)}
        >
          <span aria-hidden="true">♥</span>
          {mostrarFavoritos ? 'Ver todas' : `Favoritas (${favoritos.length})`}
        </button>
      </div>

      {erro && <div role="alert"><p>{erro}</p><button onClick={() => { setErro(''); setCarregando(true); setTentativa((valor) => valor + 1) }}>Tentar novamente</button></div>}
      {carregando ? <p role="status">Carregando universidades e favoritas...</p> : universidadesExibidas.length > 0 ? (
        <div className="universidades-grid">
          {universidadesExibidas.map((universidade) => (
            <CardUniversidade
              key={universidade.id}
              universidade={universidade}
              salvando={salvando}
              favoritada={favoritos.includes(universidade.id)}
              onFavoritar={alternarFavorito}
            />
          ))}
        </div>
      ) : (
        <div className="favoritos-vazio">
          <span aria-hidden="true">♡</span>
          <h3>{mostrarFavoritos ? 'Você ainda não salvou universidades' : 'Nenhuma universidade cadastrada'}</h3>
          <p>Volte para todas as instituições e toque no coração de uma universidade para adicioná-la aos favoritos.</p>
          <button type="button" className="filtro-favoritos" onClick={() => setMostrarFavoritos(false)}>
            Explorar universidades
          </button>
        </div>
      )}
      <p className="nota-universidades">As informações são resumos introdutórios. Confira os cursos, requisitos e prazos nos sites oficiais de cada instituição.</p>
    </main>
  )
}

export default Universidades
