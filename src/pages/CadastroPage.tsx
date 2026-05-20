import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../api/config';
import { validarEmail } from '../utils/validacoes';
import './LoginPage.css';
import './CadastroPage.css';

interface CadastroForm {
  nome: string;
  email: string;
  senha: string;
  tipo: 'ADMIN' | 'USER' | 'BARBEIRO';
}

function CadastroPage() {
  const [form, setForm] = useState<CadastroForm>({
    nome: '',
    email: '',
    senha: '',
    tipo: 'USER',
  });
  const [erro, setErro] = useState<string>('');
  const [sucesso, setSucesso] = useState<string>('');
  const [errosCampos, setErrosCampos] = useState<{ email?: string; senha?: string }>({});
  const [carregando, setCarregando] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errosCampos[name as keyof typeof errosCampos]) {
      setErrosCampos(prev => ({ ...prev, [name]: '' }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const novosErros: { email?: string; senha?: string } = {};
    if (!validarEmail(form.email)) {
      novosErros.email = 'Informe um e-mail válido.';
    }
    if (form.senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (Object.keys(novosErros).length > 0) {
      setErrosCampos(novosErros);
      return;
    }
    setErrosCampos({});
    setCarregando(true);

    try {
      const resposta = await apiCall('/usuarios', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao criar conta');
      }

      setSucesso('Conta criada com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setErro('Não foi possível criar a conta. Verifique os dados e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card cadastro-card">
        <div className="login-logo">
          <i className="fa-solid fa-scissors login-logo__icone" />
          <h1 className="login-logo__titulo">Barbearia Fah Cortes</h1>
        </div>

        <p className="login-subtitulo">Crie sua conta</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-campo">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>

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
              className={errosCampos.senha ? 'input--invalido' : ''}
            />
            {errosCampos.senha && (
              <span className="login-campo-erro">{errosCampos.senha}</span>
            )}
          </div>

          <div className="login-campo">
            <label htmlFor="tipo">Perfil</label>
            <select
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="cadastro-select"
            >
              <option value="USER">Cliente</option>
              <option value="BARBEIRO">Barbeiro</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          {erro && <p className="login-erro">{erro}</p>}
          {sucesso && <p className="login-sucesso">{sucesso}</p>}

          <button type="submit" className="login-botao" disabled={carregando}>
            {carregando ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <p className="login-cadastro">
          Já tem conta?{' '}
          <Link to="/login" className="login-cadastro__link">Fazer login</Link>
        </p>
      </div>
    </main>
  );
}

export default CadastroPage;
