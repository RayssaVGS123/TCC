import { useState } from 'react'
import CardUniversidade from '../componentes/CardUniversidade'
import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/Universidades.css'

const universidades = [
  {
    id: '1',
    nome: 'University of Edinburgh',
    pais: 'Edimburgo, Escócia',
    descricao: 'Oferece formação em Ciência da Computação e Informática.',
    imagem: 'https://images.openai.com/static-rsc-4/cey4yq4B4e8zxJ_NwVWDscKwNdMcvJFAmcF4pojI-DSlDqg2g1tE91cpRyhBG48NUKdcxh1f-gqMm1oM8O34C3LLUds-sSecYnbrsMfTlN1tbn0FsDln2sddmNGgoQH0sSAOhXnjXVuNQ2_0ECCo0GQBdIKFG_R25GbMo7AVVS_y6s8HQtqlBZmOG37Nnhkf?purpose=fullsize',
    site: 'https://www.ed.ac.uk/'
  },
  {
    id: '2',
    nome: 'University of Surrey',
    pais: 'Guildford, Inglaterra',
    descricao: 'Possuí cursos de Ciência da Computação, Inteligência Artificial, Ciência de Dados e Cibersegurança.',
    imagem: 'https://images.openai.com/static-rsc-4/y6aStQvCWu2T5T5pH-hG9iEYq3oT3qj_QE3FkU5BKSuzP3jColfHx2Dtpo38mfeYcsFdXnE7g46Hi_UBRVeHki0OKpkdIZnQqwHGoznJXGnvhQdin-jyCAHvTWTdzjSLFHiCDeWn2Z9kAtWZyS9K44VrT2tGCQIoVgO3kX6v3q82PowxGMhaFb_rXzF_SxSY?purpose=fullsize',
    site: 'https://www.surrey.ac.uk/'
  },
  {
    id: '3',
    nome: 'University of York',
    pais: 'York, Inglaterra',
    descricao: 'Universidade pública reconhecida pela qualidade do ensino, pesquisa e ambiente internacional.',
    imagem: 'https://images.openai.com/static-rsc-4/TvrNnY74vyYkEeprQnHPRuzWFMlEXqjeBVT2FV497WcmIfx5lWNdPLvpjigDezM9qapbzyFCqc19Bbi7hYGm-pAB4XPwpvsKsgrHzHgsWolnuGZGDxFpBWfSDIx8GHnkPXqoQ7WhFGJGdhIKt6Df420Le6KvPYEZnu4R_OdK_YTtXcHg8mxn8kltrJcp7DPz?purpose=fullsize',
    site: 'https://www.york.ac.uk/computer-science/study/?utm_source=chatgpt.com'
  },
  {
    id: '4',
    nome: 'New York University(NYU)',
    pais: 'Brooklyn e Manhattan, Nova York',
    descricao: 'Destaque em tecnologia, arquitetura, engenharia e projetos aplicados ao mercado.',
    imagem: 'https://images.openai.com/static-rsc-4/PTl48Dkkfhdjw_t5gO8GaVSwalL9O7NnqWSHdk6_gACPPEFWdsT9J47VW2yA1cVB1ETDZ-jgjCMqgAEdsnqSDaG9hmHqb1xta99JCk1z--lVxbHe2pF11kHcx-G47SKoLYGDCn8rb83aM37TM3aJ5HWthnx955jnuTmtUVYG-Yf9LkEMkjiAHDdcNkA-LhNs?purpose=fullsize',
    site: 'https://engineering.nyu.edu/'
  },
  {
    id: '5',
    nome: 'Universidade do Porto',
    pais: 'Porto, Portugal',
    descricao: 'Ciência da Computação, programação, bancos de dados, sistemas e desenvolvimento web e mobile.',
    imagem: 'https://images.openai.com/static-rsc-4/saahZM8DkdRJfmzNtOp_gcm0akY1DoGn44ss5tIX0JdClqJqtV8nwXz3VzdnlJHa6DW7U9Tbw-vAk1N69Gf3kNIdD3DE_T-6HWJoSUuKlssHelqFNgxf8cZKPoEdQv60qSkLzYJBaRZN4dwunp1-H9lD5LV97xeh8Qgr4de1VGVG_anEiptjPdQNMOSw1I23?purpose=fullsize',
    site: 'https://www.up.pt/portal/en/'
  }
]

function Universidades() {
  const [favoritos, setFavoritos] = useLocalStorage('malagon-universidades-favoritas', [])
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((favorito) => favorito !== id)
        : [...atuais, id]
    )
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

      {universidadesExibidas.length > 0 ? (
        <div className="universidades-grid">
          {universidadesExibidas.map((universidade) => (
            <CardUniversidade
              key={universidade.id}
              universidade={universidade}
              favoritada={favoritos.includes(universidade.id)}
              onFavoritar={alternarFavorito}
            />
          ))}
        </div>
      ) : (
        <div className="favoritos-vazio">
          <span aria-hidden="true">♡</span>
          <h3>Você ainda não salvou universidades</h3>
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
