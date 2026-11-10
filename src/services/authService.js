import { obterSupabase } from '../lib/supabase'

export async function cadastrar({ nome, email, perfil, senha }) {
  const { data, error } = await obterSupabase().auth.signUp({
    email: email.trim(),
    password: senha,
    options: {
      data: { nome: nome.trim(), perfil },
      emailRedirectTo: window.location.origin
    }
  })
  if (error) throw error
  return data
}

export async function entrar(email, senha) {
  const { data, error } = await obterSupabase().auth.signInWithPassword({ email: email.trim(), password: senha })
  if (error) throw error
  return data
}

export async function entrarComProvedor(provider) {
  const { error } = await obterSupabase().auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin }
  })
  if (error) throw error
}

export async function sair() {
  const { error } = await obterSupabase().auth.signOut()
  if (error) throw error
}

export async function solicitarRecuperacao(email) {
  const { error } = await obterSupabase().auth.resetPasswordForEmail(email.trim(), {
    redirectTo: window.location.origin
  })
  if (error) throw error
}

export async function atualizarSenha(password) {
  const { error } = await obterSupabase().auth.updateUser({ password })
  if (error) throw error
}
