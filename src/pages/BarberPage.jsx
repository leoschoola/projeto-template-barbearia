import './BarberPage.css'
import Barber from '../components/Barber';
import BarberCard from '../components/Barber-card';

function BarberPage() {
    return (
        <>
        <main className='principal__barbeiro'>
            <Barber/>
            <BarberCard
                img='barbeiros'
                nome='Carlos Silva'
                especialidade='Cortes Clássicos & Modernos'
                nota='4.9'
                avaliacao='(230)'
                experiencia='12 anos de experiência'
                agendar='Agendar com Carlos'
            />
        </main>
        </>
    )
}

export default BarberPage;