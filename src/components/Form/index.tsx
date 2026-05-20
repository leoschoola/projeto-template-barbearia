import { useState } from 'react';
import { mascaraTelefone, validarTelefone, validarEmail } from '../../utils/validacoes';
import './Form.css';

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
  duracao?: number;
}

export interface AgendamentoData {
  nome: string;
  telefone: string;
  email: string;
  unidade: string;
  servico: string;
  barbeiro: string;
  data: string;
  horario: string;
  observacoes: string;
}

interface FormProps {
  formData: AgendamentoData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  servicos?: Servico[];
  carregando?: boolean;
}

const Form = ({ formData, onChange, onSubmit, servicos = [], carregando = false }: FormProps) => {
  const [erros, setErros] = useState<Record<string, string>>({});

  function handleTelefoneChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const masked = mascaraTelefone(e.target.value);
    if (erros.telefone) setErros(prev => ({ ...prev, telefone: '' }));
    onChange({ target: { name: 'telefone', value: masked } } as React.ChangeEvent<HTMLInputElement>);
  }

  function handleCampoChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name } = e.target;
    if (erros[name]) setErros(prev => ({ ...prev, [name]: '' }));
    onChange(e);
  }

  function handleSubmitInterno(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const novosErros: Record<string, string> = {};

    if (!validarTelefone(formData.telefone)) {
      novosErros.telefone = 'Informe o celular no formato (XX) XXXXX-XXXX.';
    }
    if (!validarEmail(formData.email)) {
      novosErros.email = 'Informe um e-mail válido.';
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});
    onSubmit(e);
  }

  return (
    <section className="agendamento-secao">
      <form className="agendamento-formulario" onSubmit={handleSubmitInterno}>

        {/* Nome */}
        <div className="input-grupo">
          <label htmlFor="nome" className="input-rotulo">Nome Completo</label>
          <div className="input-container">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleCampoChange}
              placeholder="Seu nome"
              required
            />
          </div>
        </div>

        {/* Telefone */}
        <div className="input-grupo">
          <label htmlFor="telefone" className="input-rotulo">Telefone</label>
          <div className={`input-container${erros.telefone ? ' input--invalido' : ''}`}>
            <i className="fa-solid fa-phone"></i>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleTelefoneChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>
          {erros.telefone && <span className="erro-campo">{erros.telefone}</span>}
        </div>

        {/* Email */}
        <div className="input-grupo">
          <label htmlFor="email" className="input-rotulo">E-mail</label>
          <div className={`input-container${erros.email ? ' input--invalido' : ''}`}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleCampoChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          {erros.email && <span className="erro-campo">{erros.email}</span>}
        </div>

        {/* Unidade */}
        <div className="select-grupo">
          <label htmlFor="unidade" className="select-rotulo">Unidade</label>
          <div className="select-container">
            <i className="fa-solid fa-location-dot"></i>
            <select
              id="unidade"
              name="unidade"
              value={formData.unidade}
              onChange={handleCampoChange}
              required
            >
              <option value="">Selecione a unidade</option>
              <option value="centro">Unidade Centro</option>
              <option value="paulista">Unidade Paulista</option>
            </select>
            <i className="fa-solid select-icone-seta"></i>
          </div>
        </div>

        {/* Serviço */}
        <div className="select-grupo">
          <label htmlFor="servico" className="select-rotulo">Serviço</label>
          <div className="select-container">
            <i className="fa-solid fa-scissors"></i>
            <select
              id="servico"
              name="servico"
              value={formData.servico}
              onChange={handleCampoChange}
              required
              disabled={carregando || servicos.length === 0}
            >
              <option value="">
                {carregando ? 'Carregando serviços...' : servicos.length === 0 ? 'Nenhum serviço disponível' : 'Selecione o serviço'}
              </option>
              {servicos.length > 0 ? (
                servicos.map(s => (
                  <option key={s.id || s.nome} value={String(s.id || s.nome)}>
                    {s.nome} {s.preco ? `- R$ ${s.preco.toFixed(2)}` : ''}
                  </option>
                ))
              ) : (
                <>
                  <option value="corte">Corte Masculino</option>
                  <option value="barba">Barba Clássica</option>
                  <option value="combo">Combo Completo</option>
                </>
              )}
            </select>
            <i className="fa-solid select-icone-seta"></i>
          </div>
        </div>

        {/* Barbeiro */}
        <div className="select-grupo">
          <label htmlFor="barbeiro" className="select-rotulo">Barbeiro</label>
          <div className="select-container">
            <i className="fa-solid fa-user-tag"></i>
            <select
              id="barbeiro"
              name="barbeiro"
              value={formData.barbeiro}
              onChange={handleCampoChange}
            >
              <option value="">Selecione o barbeiro</option>
              <option value="joao">João</option>
              <option value="pedro">Pedro</option>
            </select>
            <i className="fa-solid select-icone-seta"></i>
          </div>
        </div>

        {/* Data */}
        <div className="select-grupo">
          <label htmlFor="data" className="select-rotulo">Data</label>
          <div className="select-container">
            <i className="fa-solid fa-calendar-days"></i>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleCampoChange}
              required
            />
          </div>
        </div>

        {/* Horário */}
        <div className="select-grupo">
          <label htmlFor="horario" className="select-rotulo">Horário</label>
          <div className="select-container">
            <i className="fa-solid fa-clock"></i>
            <select
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleCampoChange}
              required
            >
              <option value="">Selecione o horário</option>
              <option value="0900">09:00</option>
              <option value="1000">10:00</option>
            </select>
            <i className="fa-solid select-icone-seta"></i>
          </div>
        </div>

        {/* Observações */}
        <div className="input-grupo observacoes">
          <label htmlFor="observacoes" className="input-rotulo">Observações</label>
          <div className="input-container">
            <input
              type="text"
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleCampoChange}
              placeholder="Alguma preferência ou observação"
            />
          </div>
        </div>

        <button type="submit" className="botao-confirmar">
          Confirmar Agendamento
        </button>

        <button type="reset" className="botao-limpar">
          Limpar Formulário
        </button>

      </form>
    </section>
  );
};

export default Form;
