import './Plans-card.css';

interface PlansCardProps {
  icon: string;
  plano: string;
  subtitulo: string;
  valor: string;
  beneficios?: string[];
  isAdmin?: boolean;
  aoAssinar?: () => void;
  aoDeletar?: () => void;
  aoEditar?: () => void;
}

const PlansCard = ({ icon, plano, subtitulo, valor, beneficios = [], isAdmin, aoAssinar, aoDeletar, aoEditar }: PlansCardProps) => {
  const planoClasse = plano.toLowerCase();

  return (
    <article className={`plano__card plano__card--${planoClasse}`}>
      <div className="plano__icone-container">
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <h3 className="plano__nome">{plano}</h3>
      <p className="plano__subtitulo">{subtitulo}</p>
      <p className="plano__preco">{valor}</p>

      <ul className="plano__beneficios">
        {beneficios.map((item, index) => (
          <li key={index} className="plano__item">
            <i className="fa-solid fa-circle-check"></i> {item}
          </li>
        ))}
      </ul>

      <button className={`plano__botao plano__botao--${planoClasse}`} onClick={aoAssinar}>
        Assinar Plano {plano}
      </button>

      {isAdmin && (
        <div className="plano__admin-controles">
          <button className="plano__botao-editar" onClick={aoEditar} type="button">
            <i className="fa-solid fa-pen"></i> Editar plano
          </button>
          <button className="plano__botao-deletar" onClick={aoDeletar} type="button">
            <i className="fa-solid fa-trash"></i> Remover plano
          </button>
        </div>
      )}
    </article>
  );
};

export default PlansCard;
