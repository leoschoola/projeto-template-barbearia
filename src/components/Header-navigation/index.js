import './Header-navigation.css';

function CabecalhoNavegacao({ link, classe, children }) {
    return (
        <li className="cabecalho__item">
        <a href={link} className={`cabecalho__link ${classe}`}>
            {children}
        </a>
        </li>
    );

}

export default CabecalhoNavegacao;