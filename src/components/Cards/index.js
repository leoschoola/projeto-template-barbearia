import './Cards.css';

const Cards = ({ icon, tituloCard, descricaoCard, precoCard }) => {
    return (
        <div className="cards">
            <article className="card">
                <i className={`icon fa-solid ${icon}`}></i>
                <h3>{tituloCard}</h3>
                <p>{descricaoCard}</p>
                <span className="card__preco">{precoCard}</span>
            </article>
        </div>
    )
}

export default Cards;