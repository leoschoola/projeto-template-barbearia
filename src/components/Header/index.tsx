import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  img: string;
  children: React.ReactNode;
}

const Header = ({ img, children }: HeaderProps) => {
  return (
    <Link to="/" className="cabecalho__logo" style={{ textDecoration: 'none', color: 'inherit' }}>
      <img
        src={`${process.env.PUBLIC_URL}/imagens/${img}.png`}
        alt={`Ícone do ${img}`}
        className="cabecalho__icone"
      />
      <h3 className="cabecalho__titulo">{children}</h3>
    </Link>
  );
};

export default Header;
