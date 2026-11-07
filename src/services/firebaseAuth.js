import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const firebaseConfigurado = Object.values(config).every(Boolean)

const auth = firebaseConfigurado
  ? getAuth(getApps().length ? getApp() : initializeApp(config))
  : null

export function observarSessao(callback, aoErro) {
  if (!auth) return () => {}
  return onAuthStateChanged(auth, callback, aoErro)
}

export async function entrarComGoogle() {
  if (!auth) {
    const erro = new Error('Configure as variáveis do Firebase no arquivo .env.local para ativar o login Google.')
    erro.code = 'firebase/config-missing'
    throw erro
  }

  const provedor = new GoogleAuthProvider()
  provedor.setCustomParameters({ prompt: 'select_account' })
  return signInWithPopup(auth, provedor)
}
