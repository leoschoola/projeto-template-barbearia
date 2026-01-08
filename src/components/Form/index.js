import './Form.css';

const Form = ({ formData, onChange, onSubmit }) => {
    return (
        <section className="agendamento-secao">
            <form className="agendamento-formulario" onSubmit={onSubmit}>

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
                            onChange={onChange}
                            placeholder="Seu nome"
                            required
                        />
                    </div>
                </div>

                {/* Telefone */}
                <div className="input-grupo">
                    <label htmlFor="telefone" className="input-rotulo">Telefone</label>
                    <div className="input-container">
                        <i className="fa-solid fa-phone"></i>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={onChange}
                            placeholder="(11) 99999-9999"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="input-grupo">
                    <label htmlFor="email" className="input-rotulo">E-mail</label>
                    <div className="input-container">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>
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
                            onChange={onChange}
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
                            onChange={onChange}
                            required
                        >
                            <option value="">Selecione o serviço</option>
                            <option value="corte">Corte Masculino</option>
                            <option value="barba">Barba Clássica</option>
                            <option value="combo">Combo Completo</option>
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
