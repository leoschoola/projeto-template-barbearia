import './BarberCard.css';

const BarberCard = ({ img, nome, especialidade, nota, avaliacao, experiencia, agendar }) => {
    return (
        <section className="barbeiros__cartoes">
            <article className="barbeiro__card">
                
                <div className="barbeiro__imagem-container">
                    {/* Adicionado process.env.PUBLIC_URL para corrigir o caminho no GitHub Pages */}
                    <img 
                        src={`${process.env.PUBLIC_URL}/imagens/${img}.jpg`} 
                        alt={`Foto do barbeiro ${nome}`} 
                        className="barbeiro__foto"
                    />
                </div>

                <div className="barbeiro__info">
                    <h3 className="barbeiro__nome">{nome}</h3>
                    <p className="barbeiro__especialidade">{especialidade}</p>
                    
                    <div className="barbeiro__detalhes">
                        <div className="barbeiro__rating">
                            <i className="fa-solid fa-star"></i>
                            <span className="barbeiro__nota">{nota}</span>
                            <span className="barbeiro__avaliacoes">{avaliacao}</span>
                        </div>
                        
                        <div className="barbeiro__experiencia">
                            <i className="fa-solid fa-graduation-cap"></i> <span>{experiencia}</span>
                        </div>
                    </div>
                    
                    <button className="barbeiro__botao">
                        <i className="fa-regular fa-calendar-alt"></i> {agendar}
                    </button>
                </div>
            </article>
        </section>
    );
}

export default BarberCard;