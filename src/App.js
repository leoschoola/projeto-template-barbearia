import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import CabecalhoNavegacao from './components/Header-navigation';
import Menu from './components/Menu';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  return (
    <div className="App">
      <header className="cabecalho">
        <Header img="icon-tesoura">Barbearia Fah Cortes</Header>

        <Menu aberto={menuAberto} toggle={toggleMenu} />

        <ul className={`cabecalho__navegacao ${menuAberto ? 'ativo' : ''}`}>
          <CabecalhoNavegacao link="#" classe="cabecalho__link--ativo">
            Início
          </CabecalhoNavegacao>

          <CabecalhoNavegacao link="#">
            Barbeiros
          </CabecalhoNavegacao>

          <CabecalhoNavegacao link="#">
            Planos Fidelidade
          </CabecalhoNavegacao>

          <CabecalhoNavegacao link="#">
            Unidades
          </CabecalhoNavegacao>

          <CabecalhoNavegacao link="#">
            Produtos
          </CabecalhoNavegacao>
        </ul>
      </header>
    </div>
  );
}

export default App;
