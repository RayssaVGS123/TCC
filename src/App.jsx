import { useEffect, useState } from 'react'
import PaginaInicial from './pages/PaginaInicial.jsx'
import Login from './pages/Login.jsx'
import { supabase, supabaseConfigurado, mensagemErro } from './lib/supabase'
import { atualizarSenha } from './services/authService'
import './App.css'

function App() {
  const [sessao, setSessao] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [recuperando, setRecuperando] = useState(false)
  const [senha, setSenha] = useState('')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    document.title = sessao ? 'Malagon' : 'Entrar | Malagon'
  }, [sessao])

  useEffect(() => {
    if (!supabase) return
    let ativo = true
    // O evento também acompanha login, confirmação de e-mail, recuperação e saída.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((evento, novaSessao) => {
      if (!ativo) return
      setSessao(novaSessao)
      setCarregando(false)
      if (evento === 'PASSWORD_RECOVERY') setRecuperando(true)
      if (evento === 'SIGNED_OUT') setRecuperando(false)
    })
    supabase.auth.getSession().then(({ data, error }) => {
      if (!ativo) return
      if (error) setErro(mensagemErro(error))
      else setSessao(data.session)
      setCarregando(false)
    }).catch(() => {
      if (ativo) { setErro('Não foi possível verificar sua sessão. Recarregue a página.'); setCarregando(false) }
    })
    return () => { ativo = false; subscription.unsubscribe() }
  }, [])

  async function aoAtualizarSenha(evento) {
    evento.preventDefault()
    setSalvando(true)
    setErro('')
    try {
      await atualizarSenha(senha)
      setSenha('')
      setRecuperando(false)
    } catch (erro) {
      setErro(mensagemErro(erro))
    } finally {
      setSalvando(false)
    }
  }

  if (!supabaseConfigurado) return <main className="aviso-sistema"><h1>Configuração pendente</h1><p>Conecte o projeto ao Supabase seguindo o README. Depois, reinicie o servidor.</p></main>
  if (carregando) return <p role="status">Verificando sessão...</p>
  if (recuperando) return <main className="aviso-sistema"><form onSubmit={aoAtualizarSenha}><h1>Redefinir senha</h1><label htmlFor="nova-senha">Nova senha</label><input id="nova-senha" type="password" minLength={8} required value={senha} onChange={(evento) => setSenha(evento.target.value)} autoComplete="new-password" />{erro && <p role="alert">{erro}</p>}<button disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar nova senha'}</button></form></main>

  return <div className="App">{erro && <p role="alert">{erro}</p>}{sessao ? <PaginaInicial key={sessao.user.id} usuario={sessao.user} /> : <Login />}</div>
}

export default App
