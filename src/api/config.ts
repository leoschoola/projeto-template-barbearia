/**
 * Configuração centralizada para chamadas à API
 * - Adiciona Authorization header automaticamente
 * - Gerencia base URL conforme ambiente
 */

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

export { API_BASE_URL };

export interface ApiCallOptions extends RequestInit {
  token?: string;
}

/**
 * Wrapper para fetch que adiciona:
 * - Authorization header (se houver token no localStorage)
 * - Content-Type: application/json
 */
export async function apiCall(
  endpoint: string,
  options?: ApiCallOptions
): Promise<Response> {
  const token = options?.token || localStorage.getItem('fahcortes_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}

/**
 * Tipagem para resposta de login
 */
export interface LoginResponse {
  token: string;
  tipo: 'ADMIN' | 'USER' | 'BARBEIRO';
}
