import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import CabecalhoNavegacao from './components/Header-navigation';
import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';
import BarberPage from './pages/BarberPage';
// import Produtos from './pages/Produtos';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  const linksMenu = [
    { texto: 'Início', link: '/' },
    { texto: 'Barbeiros', link: '/barbeiros' },
    { texto: 'Planos Fidelidade', link: '/planos' },
    { texto: 'Unidades', link: '/unidades' },
    { texto: 'Produtos', link: '/produtos' },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <header className="cabecalho">
          <Header img="icon-tesoura">Barbearia Fah Cortes</Header>

          <Menu aberto={menuAberto} toggle={toggleMenu} />

          <ul className={`cabecalho__navegacao ${menuAberto ? 'ativo' : ''}`}>
            {linksMenu.map((item, index) => (
              <CabecalhoNavegacao key={index} link={item.link}>
                {item.texto}
              </CabecalhoNavegacao>
            ))}
          </ul>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barbeiros" element={<BarberPage />} />
          {/* <Route path="/produtos" element={<Produtos />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
