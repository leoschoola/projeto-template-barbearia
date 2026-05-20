import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header-navigation.css';

interface CabecalhoNavegacaoProps {
  link: string;
  children: React.ReactNode;
  destaque?: boolean;
  login?: boolean;
}

function CabecalhoNavegacao({ link, children, destaque, login }: CabecalhoNavegacaoProps) {
  return (
    <li className="cabecalho__item">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `
          cabecalho__link
          ${destaque ? 'cabecalho__link--botao' : ''}
          ${login ? 'cabecalho__link--login' : ''}
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
