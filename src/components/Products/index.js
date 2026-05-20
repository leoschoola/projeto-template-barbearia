import './Products.css';

const Products = ({ img, nomeProduto, nota, avaliacoes, valor  }) => {
    return (
        <>
        <section className="produtos__cartoes-container">
            <article className="produto__card">
                <div className="produto__imagem-container">
                    <img 
                        src={`${process.env.PUBLIC_URL}/imagens/${img}.jpg`} 
                        alt={`imagem ${nomeProduto}`} 
                        className="produto__foto"
                    />
                </div>
                <div className="produto__info">
                    <h3 className="produto__nome">{nomeProduto}</h3>
                    <div className="produto__rating">
                        <i className="fa-solid fa-star"></i>
                        <span className="produto__nota">{nota}</span>
                        <span className="produto__avaliacoes">({avaliacoes})</span>
                    </div>
                    <p className="produto__preco-atual">R$ {valor}</p>
                    <button className="produto__botao-carrinho">
                        <i className="fa-solid fa-shopping-cart"></i> Adicionar ao Carrinho
                    </button>
                </div>
            </article>
        </section>
        </>
    )
}

export default Products;