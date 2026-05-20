import './TituloTextoPadrao.css';

interface TituloTextoPadraoProps {
  titulo: string;
  texto: string;
}

const TituloTextoPadrao = ({ titulo, texto }: TituloTextoPadraoProps) => {
  return (
    <section className="barbeiros__cabecalho">
      <h2 className="barbeiros__titulo">{titulo}</h2>
      <p className="barbeiros__descricao">{texto}</p>
    </section>
  );
};

export default TituloTextoPadrao;
