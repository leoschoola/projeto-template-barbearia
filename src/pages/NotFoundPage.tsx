import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <main className="notfound-page">
      <div className="notfound-card">
        <i className="fa-solid fa-scissors notfound-icone" />

        <h1 className="notfound-codigo">404</h1>

        <div className="notfound-divisor" />

        <h2 className="notfound-titulo">Página não encontrada</h2>

        <p className="notfound-descricao">
          A página que você está procurando não existe, foi movida ou o endereço foi digitado incorretamente.
        </p>

        <Link to="/" className="notfound-botao">
          <i className="fa-solid fa-house" />
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
