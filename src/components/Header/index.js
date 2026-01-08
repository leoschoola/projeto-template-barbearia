import "./Header.css";

const Header = ({ img, children }) => {
  return (
    <div className="cabecalho__logo">
      <img
        src={`${process.env.PUBLIC_URL}/imagens/${img}.png`}
        alt={`Ícone do ${img}`}
        className="cabecalho__icone"
      />
      <h3 className="cabecalho__titulo">{children}</h3>
    </div>
  );
};

export default Header;