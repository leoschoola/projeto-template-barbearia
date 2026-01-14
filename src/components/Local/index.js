import './Local.css';

const Local = ({ nomeUnidade, distacia, endereco, telefone, horario }) => {
    return (
        <>
        <section className="unidades__cartoes-container">
            <article className="unidade__card">
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
                </article>
            </section>
        </>
    )
}   

export default Local;