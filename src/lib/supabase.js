import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const chavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigurado = Boolean(url && chavePublica)
export const supabase = supabaseConfigurado ? createClient(url, chavePublica) : null

export function obterSupabase() {
  if (!supabase) throw new Error('Configure a URL e a chave pública do Supabase para continuar.')
  return supabase
}

export function mensagemErro(erro) {
  const mensagens = {
    invalid_credentials: 'E-mail ou senha incorretos.',
    email_not_confirmed: 'Confirme seu e-mail antes de entrar.',
    user_already_exists: 'Já existe uma conta com esse e-mail.',
    weak_password: 'Escolha uma senha mais forte, com pelo menos 8 caracteres.',
    over_email_send_rate_limit: 'Aguarde alguns minutos antes de solicitar outro e-mail.',
    signup_disabled: 'O cadastro está desativado. Confira a configuração do Supabase.'
  }
  if (mensagens[erro?.code]) return mensagens[erro.code]
  if (erro instanceof TypeError) return 'Não foi possível conectar. Confira sua internet e tente novamente.'
  return 'Não foi possível concluir a operação. Tente novamente e confira a configuração do Supabase.'
}
