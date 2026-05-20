import Cards from "../Cards";
import ContactCard from "../Contact-card";
import "./Services.css";

const Services = () => {
  return (
    <section className="secao__servicos">
      <h3 className="principal__servicos" id="id-principal__servicos">
        Nossos Serviços
      </h3>
      <p className="principal__paragrafo">
        Oferecemos uma variedade de serviços para atender às suas necessidades
        de estilo e cuidado pessoal.
      </p>
      <Cards
        icon="fa-scissors"
        tituloCard="Corte de Cabelo"
        descricaoCard="Corte de cabelo com máquina ou tesoura"
        precoCard="A partir de R$50,00"
      />
      <Cards
        icon="fa-droplet"
        tituloCard="Barba & Bigode"
        descricaoCard="Modelagem completa com navalha, toalha quente e produtos premium"
        precoCard="A partir de R$40,00"
      />
      <Cards
        icon="fa-star"
        tituloCard="Combo Completo"
        descricaoCard="Corte + Barba + Acabamento com produtos profissionais"
        precoCard="A partir de R$80,00"
      />
      <Cards
        icon="fa-crown"
        tituloCard="Atendimento VIP"
        descricaoCard="Experiência exclusiva com barbeiro dedicado e bebidas cortesia"
        precoCard="A partir de R$120,00"
      />
      <ContactCard 
        titulo="Fale Conosco"
        descricao="Tire suas dúvidas ou agende por WhatsApp."
        numero="5511957333871"
        mensagem="Enviar Mensagem"
      />
    </section>
  );
};

export default Services;
