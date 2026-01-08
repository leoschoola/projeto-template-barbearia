import { NavLink } from 'react-router-dom';
import './Header-navigation.css';

function CabecalhoNavegacao({ link, children, destaque }) {
  return (
    <li className="cabecalho__item">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `
          cabecalho__link
          ${destaque ? 'cabecalho__link--botao' : ''}
          ${isActive ? 'cabecalho__link--ativo' : ''}
        `
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default CabecalhoNavegacao;
