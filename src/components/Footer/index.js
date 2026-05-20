import "./Footer.css";

const Footer = () => {
  return (
    <footer className="rodape">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">
            <i className="fa-solid fa-scissors"></i> Barbearia Fah Cortes
          </h3>
          <p>
            Excelência em barbearia, oferecendo cortes modernos e cuidados
            personalizados para homens que valorizam estilo e tradição.
          </p>
        </div>
        <div className="footer-col">
          <h4>Contato</h4>
          <p>
            <i className="fa-solid fa-phone"></i> (11) 95733-3871
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> contato@fahcortes.com
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Rua Campo Novo do Sul,
            170 - Vila Andrade, São Paulo - SP
          </p>
        </div>
        <div className="footer-col">
          <h4>Redes Sociais</h4>
          <div className="social-icons">
            <a href='https://instagram.com/barbeariafahcortes'>
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href='https://instagram.com/barbeariafahcortes'>
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href='https://instagram.com/barbeariafahcortes'>
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
          <p>Siga-nos nas redes sociais e fique por dentro das novidades!</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Barbearia Fah Cortes. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="https://instagram.com/barbeariafahcortes">Política de Privacidade</a>
          <a href="https://instagram.com/barbeariafahcortes">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
