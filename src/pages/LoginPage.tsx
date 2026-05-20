import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validarEmail } from '../utils/validacoes';
import './LoginPage.css';

interface LoginForm {
  email: string;
  senha: string;
}

function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', senha: '' });
  const [erro, setErro] = useState<string>('');
  const [errosCampos, setErrosCampos] = useState<{ email?: string }>({});
  const [carregando, setCarregando] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'email' && errosCampos.email) {
      setErrosCampos(prev => ({ ...prev, email: '' }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErro('');

    if (!validarEmail(form.email)) {
      setErrosCampos({ email: 'Informe um e-mail válido.' });
      return;
    }
    setErrosCampos({});
    setCarregando(true);

    try {
      await login(form.email, form.senha);
      navigate('/');
    } catch {
      setErro('Email ou senha inválidos. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <i className="fa-solid fa-scissors login-logo__icone" />
          <h1 className="login-logo__titulo">Barbearia Fah Cortes</h1>
        </div>

        <p className="login-subtitulo">Entre na sua conta</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              className={errosCampos.email ? 'input--invalido' : ''}
            />
            {errosCampos.email && (
              <span className="login-campo-erro">{errosCampos.email}</span>
            )}
          </div>

          <div className="login-campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {erro && <p className="login-erro">{erro}</p>}

          <button type="submit" className="login-botao" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-cadastro">
          Não tem conta?{' '}
          <Link to="/cadastro" className="login-cadastro__link">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
