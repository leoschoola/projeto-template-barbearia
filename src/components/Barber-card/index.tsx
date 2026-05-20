import './BarberCard.css';

interface BarberCardProps {
  img: string;
  nome: string;
  especialidade: string;
  nota: string;
  avaliacao: string;
  experiencia: string;
  agendar: string;
  curtidas: number;
  jaCurtiu?: boolean;
  isAdmin?: boolean;
  aoDeletar?: () => void;
  aoEditar?: () => void;
  aoAgendar?: () => void;
  aoCurtir?: () => void;
}

const BarberCard = ({
  img, nome, especialidade, nota, avaliacao, experiencia, agendar,
  curtidas, jaCurtiu, isAdmin, aoAgendar, aoDeletar, aoEditar, aoCurtir,
}: BarberCardProps) => {
  const imgSrc = img.startsWith('data:') || img.startsWith('http')
    ? img
    : `${process.env.PUBLIC_URL}/imagens/${img}.jpg`;

  return (
    <article className="barbeiro__card">
      {isAdmin && (
        <div className="admin-controles">
          <button className="admin-controles__btn admin-controles__btn--editar" onClick={aoEditar} title="Editar barbeiro">
            <i className="fa-solid fa-pen" />
          </button>
          <button className="admin-controles__btn admin-controles__btn--deletar" onClick={aoDeletar} title="Remover barbeiro">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      )}

      <div className="barbeiro__imagem-container">
        <img src={imgSrc} alt={`Foto do barbeiro ${nome}`} className="barbeiro__foto" />
      </div>

      <div className="barbeiro__info">
        <h3 className="barbeiro__nome">{nome}</h3>
        <p className="barbeiro__especialidade">{especialidade}</p>

        <div className="barbeiro__detalhes">
          <div className="barbeiro__rating">
            <i className="fa-solid fa-star"></i>
            <span className="barbeiro__nota">{nota}</span>
            <span className="barbeiro__avaliacoes">{avaliacao}</span>
          </div>
          <div className="barbeiro__experiencia">
            <i className="fa-solid fa-graduation-cap"></i> <span>{experiencia}</span>
          </div>
        </div>

        <div className="barbeiro__acoes">
          <button className="barbeiro__botao" onClick={aoAgendar}>
            <i className="fa-regular fa-calendar-alt"></i> {agendar}
          </button>
          {!isAdmin && (
            <button
              className={`barbeiro__curtir ${jaCurtiu ? 'barbeiro__curtir--ativo' : ''}`}
              onClick={aoCurtir}
              disabled={jaCurtiu}
              title={jaCurtiu ? 'Você já curtiu este barbeiro' : 'Curtir'}
            >
              <i className="fa-solid fa-heart"></i>
              <span>{curtidas}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BarberCard;
