import './Menu.css';

const Menu = ({ aberto, toggle }) => {
  return (
    <button
      className={`menu-hamburguer ${aberto ? 'ativo' : ''}`}
      onClick={toggle}
      aria-label="Abrir menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default Menu;