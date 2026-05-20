import './Contact-card.css';

const ContactCard = ({ titulo, descricao, numero, mensagem }) => {
    return (
        <section className="secao__contato">
            <div className="contato__card">
              <i className="contato__icone fa-brands fa-whatsapp"></i>
              <h3 className="contato__titulo">{titulo}</h3>
              <p className="contato__descricao">{descricao}</p>
              <a
                href={`https://api.whatsapp.com/send?phone=${numero}&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio!`}
                target="_blank"
                rel="noopener noreferrer"
                className="contato__botao-link"
              >
                <button className="contato__botao">{mensagem}</button>
              </a>
            </div>
          </section>
    )
}

export default ContactCard;