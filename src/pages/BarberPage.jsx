import './BarberPage.css'
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import BarberCard from '../components/Barber-card';

function deletarColaborador() {
    
  }

function BarberPage() {
    return (
        <>
        <main className='principal__barbeiro'>
            <TituloTextoPadrao
                titulo='Nossos Barbeiros'
                texto='Profissionais certificados e experientes prontos para cuidar do seu visual'
            />
            <BarberCard
                img='barbeiros'
                nome='Carlos Silva'
                especialidade='Cortes Clássicos & Modernos'
                nota='4.9'
                avaliacao='(230)'
                experiencia='12 anos de experiência'
                agendar='Agendar com Carlos'
                aoDeletar={deletarColaborador}
            />
        </main>
        </>
    )
}
// titulo, texto
export default BarberPage;