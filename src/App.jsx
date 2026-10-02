import { useEffect, useState } from 'react'
import PaginaInicial from './pages/PaginaInicial.jsx'
import Login from './pages/Login.jsx'
import './App.css'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('login')

  useEffect(() => {
    document.title =
      paginaAtual === 'login' ? 'Entrar | Malagon' : 'Malagon'
  }, [paginaAtual])

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