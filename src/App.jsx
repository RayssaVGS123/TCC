import { useEffect, useState } from 'react'
import PaginaInicial from './pages/PaginaInicial.jsx'
import Login from './pages/Login.jsx'
import { observarSessao } from './services/firebaseAuth.js'
import './App.css'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('login')

  useEffect(() => {
    document.title =
      paginaAtual === 'login' ? 'Entrar | Malagon' : 'Malagon'
  }, [paginaAtual])

  useEffect(() => observarSessao(
    (usuario) => setPaginaAtual(usuario ? 'home' : 'login'),
    (erro) => console.error('Não foi possível verificar a sessão do Firebase:', erro)
  ), [])

  return (
    <div className="App">
      {paginaAtual === 'login' ? (
        <Login onLogin={() => setPaginaAtual('home')} />
      ) : (
        <PaginaInicial />
      )}
    </div>
  )
}

export default App
