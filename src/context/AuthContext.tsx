import { createContext, useContext, useState, ReactNode } from 'react';
import { apiCall, LoginResponse } from '../api/config';

export type Perfil = 'ADMIN' | 'USER' | 'BARBEIRO';

interface AuthContextData {
  token: string | null;
  perfil: Perfil | null;
  email: string | null;
  nome: string | null;
  isLogado: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  simularAdmin: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('fahcortes_token')
  );
  const [perfil, setPerfil] = useState<Perfil | null>(
    () => localStorage.getItem('fahcortes_perfil') as Perfil | null
  );
  const [email, setEmail] = useState<string | null>(
    () => localStorage.getItem('fahcortes_email')
  );
  const [nome, setNome] = useState<string | null>(
    () => localStorage.getItem('fahcortes_nome')
  );

  async function login(emailParam: string, senha: string): Promise<void> {
    const resposta = await apiCall('/login', {
      method: 'POST',
      body: JSON.stringify({ email: emailParam, senha }),
    });

    if (!resposta.ok) {
      throw new Error('Email ou senha inválidos');
    }

    const dados: LoginResponse = await resposta.json();
    localStorage.setItem('fahcortes_token', dados.token);
    localStorage.setItem('fahcortes_perfil', dados.tipo);
    localStorage.setItem('fahcortes_email', emailParam);
    setToken(dados.token);
    setPerfil(dados.tipo);
    setEmail(emailParam);

    // Tenta buscar o nome do usuário cadastrado
    try {
      const userResp = await apiCall(
        `/usuarios/email?email=${encodeURIComponent(emailParam)}`,
        { token: dados.token }
      );
      if (userResp.ok) {
        const usuario = await userResp.json();
        const nomeUsuario: string = usuario.nome ?? '';
        localStorage.setItem('fahcortes_nome', nomeUsuario);
        setNome(nomeUsuario);
      }
    } catch {
      // Backend pode estar indisponível; apenas o e-mail é usado para pré-preenchimento
    }
  }

  function logout(): void {
    localStorage.removeItem('fahcortes_token');
    localStorage.removeItem('fahcortes_perfil');
    localStorage.removeItem('fahcortes_email');
    localStorage.removeItem('fahcortes_nome');
    setToken(null);
    setPerfil(null);
    setEmail(null);
    setNome(null);
  }

  // Remover após atualizar o backend para retornar 'tipo' no login
  function simularAdmin(): void {
    localStorage.setItem('fahcortes_token', 'dev-token');
    localStorage.setItem('fahcortes_perfil', 'ADMIN');
    localStorage.setItem('fahcortes_email', 'admin@dev.com');
    localStorage.setItem('fahcortes_nome', 'Admin Dev');
    setToken('dev-token');
    setPerfil('ADMIN');
    setEmail('admin@dev.com');
    setNome('Admin Dev');
  }

  return (
    <AuthContext.Provider value={{ token, perfil, email, nome, isLogado: !!token, login, logout, simularAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
