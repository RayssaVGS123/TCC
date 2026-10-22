import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios'; // Ajusta a URL base conforme a tua API

export const usuarioService = {
  // Obter todos os utilizadores
  obterTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao procurar utilizadores:', error);
      throw error;
    }
  },

  // Obter utilizador por ID
  obterPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao procurar utilizador com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar novo utilizador
  criar: async (dadosUsuario) => {
    try {
      const response = await axios.post(API_URL, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar utilizador:', error);
      throw error;
    }
  },

  // Atualizar utilizador existente
  atualizar: async (id, dadosUsuario) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar utilizador com ID ${id}:`, error);
      throw error;
    }
  },

  // Remover utilizador
  remover: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao eliminar utilizador com ID ${id}:`, error);
      throw error;
    }
  }
};