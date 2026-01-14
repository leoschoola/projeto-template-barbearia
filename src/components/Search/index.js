import './Search.css';

const Search = () => {
    return(
        <section className="unidades__busca">
            <form className="busca__form">
                <input type="text" placeholder="Digite seu CEP" className="busca__input" />
                <button type="submit" className="busca__botao">
                    <i className="fa-solid fa-location-arrow"></i> Buscar
                </button>
            </form>
        </section>
    )

}

export default Search;