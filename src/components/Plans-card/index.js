import './Plans-card.css';

const PlansCard = ({ icon, plano, subtitulo, valor, beneficios = [] }) => {
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

      <button className={`plano__botao plano__botao--${planoClasse}`}>
        Assinar Plano {plano}
      </button>
    </article>
  );
};

export default PlansCard;
