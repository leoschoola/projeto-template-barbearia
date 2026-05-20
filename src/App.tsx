import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './utilities.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import CabecalhoNavegacao from './components/Header-navigation';
import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';
import BarberPage from './pages/BarberPage';
import AgendarPage from './pages/AgendarPage';
import PlanosPage from './pages/PlanosPage';
import UnidadesPage from './pages/UnidadesPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import NotFoundPage from './pages/NotFoundPage';

interface LinkMenuItem {
  texto: string;
  link: string;
  destaque?: boolean;
}

const linksMenu: LinkMenuItem[] = [
  { texto: 'Início', link: '/' },
  { texto: 'Barbeiros', link: '/barbeiros' },
  { texto: 'Planos Fidelidade', link: '/planos' },
  { texto: 'Unidades', link: '/unidades' },
  { texto: 'Produtos', link: '/produtos' },
  { texto: 'Agendar horário', link: '/agendar', destaque: true },
];

function AppContent() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const { isLogado, logout, simularAdmin } = useAuth();
  const navigate = useNavigate();

  function toggleMenu(): void {
    setMenuAberto(!menuAberto);
  }

  function handleLogout(): void {
    logout();
    navigate('/');
    setMenuAberto(false);
  }

  return (
    <div className="App">
      <header className="cabecalho">
        <Header img="icon-tesoura">Barbearia Fah Cortes</Header>

        <Menu aberto={menuAberto} toggle={toggleMenu} />

        <ul className={`cabecalho__navegacao ${menuAberto ? 'ativo' : ''}`}>
          {linksMenu.map((item, index) => (
            <CabecalhoNavegacao key={index} link={item.link} destaque={item.destaque}>
              {item.texto}
            </CabecalhoNavegacao>
          ))}
          {isLogado ? (
            <li className="cabecalho__item">
              <button
                className="cabecalho__link cabecalho__link--login"
                onClick={handleLogout}
              >
                Sair
              </button>
            </li>
          ) : (
            <CabecalhoNavegacao link="/login" login>
              Fazer Login
            </CabecalhoNavegacao>
          )}
        </ul>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barbeiros" element={<BarberPage />} />
        <Route path="/agendar" element={<AgendarPage />} />
        <Route path="/planos" element={<PlanosPage />} />
        <Route path="/unidades" element={<UnidadesPage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />

      {process.env.NODE_ENV === 'development' && (
        <button className="dev__btn-admin" onClick={simularAdmin} title="Simula login como ADMIN — só aparece em desenvolvimento">
          DEV: Simular Admin
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter basename="/projeto-template-barbearia">
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
