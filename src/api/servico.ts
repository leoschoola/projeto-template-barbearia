/**
 * Camada de API para gerenciamento de Serviços (cortes, barbas, etc.)
 * Integrada com endpoints do backend: GET/POST/DELETE /servico
 */

import { apiCall } from './config';

export interface Servico {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracao?: number; // em minutos
  ativo?: boolean;
}

export interface ServicoResponse extends Servico {
  id: number;
}

/**
 * Listar todos os serviços
 * GET /servico (requer ADMIN)
 */
export async function listarServicos(): Promise<ServicoResponse[]> {
  try {
    const resposta = await apiCall('/servico', {
      method: 'GET',
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao listar serviços: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao listar serviços:', erro);
    throw erro;
  }
}

/**
 * Buscar serviço por ID
 * GET /servico/{id}
 */
export async function buscarServicoPorId(id: number): Promise<ServicoResponse> {
  try {
    const resposta = await apiCall(`/servico/${id}`, {
      method: 'GET',
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar serviço ${id}: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error(`Erro ao buscar serviço ${id}:`, erro);
    throw erro;
  }
}

/**
 * Criar novo serviço
 * POST /servico (requer ADMIN)
 */
export async function criarServico(dados: Servico): Promise<ServicoResponse> {
  try {
    const resposta = await apiCall('/servico', {
      method: 'POST',
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao criar serviço: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao criar serviço:', erro);
    throw erro;
  }
}

/**
 * Atualizar serviço existente
 * PUT /servico/{id} (requer ADMIN)
 * Nota: Endpoint ainda não implementado no backend
 */
export async function atualizarServico(
  id: number,
  dados: Partial<Servico>
): Promise<ServicoResponse> {
  try {
    const resposta = await apiCall(`/servico/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao atualizar serviço ${id}: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error(`Erro ao atualizar serviço ${id}:`, erro);
    throw erro;
  }
}

/**
 * Deletar serviço
 * DELETE /servico/{id} (requer ADMIN)
 */
export async function deletarServico(id: number): Promise<void> {
  try {
    const resposta = await apiCall(`/servico/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao deletar serviço ${id}: ${resposta.status}`);
    }
  } catch (erro) {
    console.error(`Erro ao deletar serviço ${id}:`, erro);
    throw erro;
  }
}
