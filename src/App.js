import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import CabecalhoNavegacao from './components/Header-navigation';
import Menu from './components/Menu';
import Main from './components/Main';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  const linksMenu = [
    { texto: 'Início', link: '#', ativo: true },
    { texto: 'Barbeiros', link: '#' },
    { texto: 'Planos Fidelidade', link: '#' },
    { texto: 'Unidades', link: '#' },
    { texto: 'Produtos', link: '#' },
  ];

  return (
    <div className="App">
      <header className="cabecalho">
        <Header img="icon-tesoura">Barbearia Fah Cortes</Header>

        <Menu aberto={menuAberto} toggle={toggleMenu} />

        <ul className={`cabecalho__navegacao ${menuAberto ? 'ativo' : ''}`}>
          {linksMenu.map((item, index) => (
            <CabecalhoNavegacao
              key={index}
              link={item.link}
              classe={item.ativo ? 'cabecalho__link--ativo' : ''}
            >
              {item.texto}
            </CabecalhoNavegacao>
          ))}
        </ul>
      </header>
      <Main />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
