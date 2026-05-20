import './Menu.css';

interface MenuProps {
  aberto: boolean;
  toggle: () => void;
}

const Menu = ({ aberto, toggle }: MenuProps) => {
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
