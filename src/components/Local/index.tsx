import './Local.css';

interface LocalProps {
  nomeUnidade: string;
  distacia: string;
  endereco: string;
  telefone: string;
  horario: string;
  mapaUrl?: string;
  isAdmin?: boolean;
  aoDeletar?: () => void;
  aoEditar?: () => void;
}

const Local = ({ nomeUnidade, distacia, endereco, telefone, horario, mapaUrl, isAdmin, aoDeletar, aoEditar }: LocalProps) => {
  return (
    <article className="unidade__card">
      {isAdmin && (
        <div className="admin-controles">
          <button className="admin-controles__btn admin-controles__btn--editar" onClick={aoEditar} title="Editar unidade">
            <i className="fa-solid fa-pen" />
          </button>
          <button className="admin-controles__btn admin-controles__btn--deletar" onClick={aoDeletar} title="Remover unidade">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      )}

      <div className="unidade__cabecalho-card">
        <h3 className="unidade__nome">{nomeUnidade}</h3>
        <span className="unidade__distancia">{distacia}</span>
      </div>

      <div className="unidade__detalhes">
        <p className="unidade__item"><i className="fa-solid fa-location-dot"></i> {endereco}</p>
        <p className="unidade__item"><i className="fa-solid fa-phone"></i> {telefone}</p>
        <p className="unidade__item"><i className="fa-regular fa-clock"></i> {horario}</p>
      </div>

      <div className="unidade__botoes">
        <button className="unidade__botao unidade__botao--mapa">
          <i className="fa-solid fa-map-location-dot"></i> Ver no Mapa
        </button>
        <button className="unidade__botao unidade__botao--agendar">Agendar Aqui</button>
      </div>

      {mapaUrl && (
        <iframe
          className="unidade__mapa"
          src={mapaUrl}
          title={`Mapa ${nomeUnidade}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </article>
  );
};

export default Local;
