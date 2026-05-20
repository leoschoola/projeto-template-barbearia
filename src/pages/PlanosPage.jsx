import './BarberPage.css';
import TituloTextoPadrao from "../components/TituloTextoPadrao";
import PlansCard from '../components/Plans-card';

function PlanosPage() {
  return (
    <main className="principal__planos">
      <TituloTextoPadrao 
        titulo="Planos Fidelidade"
        texto="Economize e aproveite benefícios exclusivos com nossos planos mensais"
      />

      <section className="planos__cards-container">
        <PlansCard 
          icon="fa-bolt"
          plano="Bronze"
          subtitulo="Ideal para começar"
          valor="R$ 99/mês"
          beneficios={[
            "2 cortes por mês",
            "10% desconto em produtos",
            "Agendamento prioritário",
            "Atendimento preferencial"
          ]}
        />

        <PlansCard 
          icon="fa-star"
          plano="Prata"
          subtitulo="Mais procurado"
          valor="R$ 179/mês"
          beneficios={[
            "4 cortes por mês",
            "1 barba grátis",
            "15% desconto em produtos",
            "Agendamento prioritário",
            "Atendimento VIP",
            "Bebida premium inclusa"
          ]}
        />

        <PlansCard 
          icon="fa-crown"
          plano="Ouro"
          subtitulo="Experiência premium"
          valor="R$ 299/mês"
          beneficios={[
            "Cortes ilimitados",
            "Barba ilimitada",
            "25% desconto em produtos",
            "Agendamento VIP",
            "Atendimento exclusivo",
            "Bebidas premium",
            "Massagem relaxante",
            "Kit de produtos mensais"
          ]}
        />
      </section>
    </main>
  );
}

export default PlanosPage;
