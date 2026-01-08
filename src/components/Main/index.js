import { Link } from "react-router-dom"; // Importante para navegação interna
import "./Main.css";

const Main = () => {
  return (
    <section 
      className="principal__imagem hero"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/imagens/capa1.jpg)` }}
    >
      <div className="hero__conteudo">
        <h3 className="principal__titulo">Estilo e Tradição em Cada Corte</h3>
        <p className="principal__descricao">
          Experimente o melhor em cuidados masculinos com nossos barbeiros
          profissionais. Tradição, qualidade e estilo em um único lugar.
        </p>

        <div className="principal__botoes">
          {/* Use Link para rotas internas em vez de href */}
          <Link to="/agendar">
            <button className="principal__botao principal__botao--agendar">
              Agendar Agora
            </button>
          </Link>
          <a href="#id-principal__servicos">
            <button className="principal__botao principal__botao--servicos">
              Ver Serviços
            </button>
          </a>
        </div>

        <div className="principal__informacoes">
          <div className="principal__info">
            <img
              src={`${process.env.PUBLIC_URL}/imagens/icon-relogio.png`}
              alt="Ícone de relógio"
              className="principal__icone"
            />
            <p className="principal__texto">Horário Flexível</p>
            <p className="principal__texto__secundario">Seg à Sáb: 9h-20h</p>
          </div>
          <div className="principal__info">
            <img
              src={`${process.env.PUBLIC_URL}/imagens/icon-estrela (1).png`}
              alt="Ícone de estrela"
              className="principal__icone"
            />
            <p className="principal__texto">5 Estrelas</p>
            <p className="principal__texto__secundario">+1000 avaliações</p>
          </div>
          <div className="principal__info">
            <img
              src={`${process.env.PUBLIC_URL}/imagens/icon-medalha-branca.png`}
              alt="Ícone de medalha"
              className="principal__icone"
            />
            <p className="principal__texto">Profissionais</p>
            <p className="principal__texto__secundario">Certificados</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;