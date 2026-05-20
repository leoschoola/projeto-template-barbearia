import './Cards.css';

interface CardsProps {
  icon: string;
  tituloCard: string;
  descricaoCard: string;
  precoCard?: string;
}

const Cards = ({ icon, tituloCard, descricaoCard, precoCard }: CardsProps) => {
  return (
    <article className="card">
      <i className={`icon fa-solid ${icon}`}></i>
      <h3>{tituloCard}</h3>
      <p>{descricaoCard}</p>
      <span className="card__preco">{precoCard}</span>
    </article>
  );
};

export default Cards;
