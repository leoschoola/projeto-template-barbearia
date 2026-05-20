import Products from '../components/Products';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import './BarberPage.css';

function ProductsPage() {
    return (
        <main className="principal__planos">
            <TituloTextoPadrao 
                titulo='Nossos Produtos'
                texto='Produtos premium selecionados para você cuidar do seu visual em casa'
            />
            <Products 
                img='produtos'
                nomeProduto='Pomada Modeladora Premium'
                nota='4.8'
                avaliacoes='124'
                valor='45,00'
            />
            <Products 
                img='produtos'
                nomeProduto='Óleo para Barba'
                nota='4.9'
                avaliacoes='89'
                valor='38,00'
            />
            <Products 
                img='produtos'
                nomeProduto='Kit Iniciante'
                nota='4.7'
                avaliacoes='98'
                valor='89,00'
            />
            <Products 
                img='produtos'
                nomeProduto='Kit Tesouras'
                nota='5.0'
                avaliacoes='205'
                valor='85,00'
            />
            <section className="produtos__final">
                <button className="produtos__ver-todos">Ver Todos os Produtos</button>
            </section>
        </main>
    )
}

export default ProductsPage;