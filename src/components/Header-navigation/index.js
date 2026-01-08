import './Header-navigation.css';
import { NavLink } from 'react-router-dom';

function CabecalhoNavegacao({ link, classe, children }) {
    return (
        <li className="cabecalho__item">
        <NavLink
            to={link}
            className={({ isActive }) =>
            `cabecalho__link ${classe} ${isActive ? 'cabecalho__link--ativo' : ''}`
            }
        >
            {children}
      </NavLink>
        </li>
    );

}

export default CabecalhoNavegacao;