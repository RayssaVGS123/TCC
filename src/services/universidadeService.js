import { obterSupabase } from '../lib/supabase'

export async function listarUniversidades() {
  const { data, error } = await obterSupabase().from('universidades').select('*').order('id')
  if (error) throw error
  return data
}

export async function listarFavoritos(usuarioId) {
  const { data, error } = await obterSupabase().from('favoritos').select('universidade_id').eq('usuario_id', usuarioId)
  if (error) throw error
  return data.map((item) => item.universidade_id)
}

export async function salvarFavorito(usuarioId, universidadeId, remover) {
  const banco = obterSupabase()
  const { error } = remover
    ? await banco.from('favoritos').delete().eq('usuario_id', usuarioId).eq('universidade_id', universidadeId)
    : await banco.from('favoritos').insert({ usuario_id: usuarioId, universidade_id: universidadeId })
  if (error) throw error
}
