import { obterSupabase } from '../lib/supabase'

export const usuarioService = {
  obterPorId: async (id) => {
    const { data, error } = await obterSupabase().from('perfis').select('id, nome, perfil').eq('id', id).single()
    if (error) throw error
    return data
  },
  atualizar: async (id, { nome, perfil }) => {
    const { data, error } = await obterSupabase().from('perfis').update({ nome, perfil }).eq('id', id).select().single()
    if (error) throw error
    return data
  }
}
