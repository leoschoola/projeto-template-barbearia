import './BarberPage.css';
import TituloTextoPadrao from "../components/TituloTextoPadrao";
import Local from '../components/Local';
import Search from '../components/Search';

function UnidadesPage() {
    return (
        <main className="principal__planos">
            <TituloTextoPadrao 
                titulo="Nossas Unidades"
                texto="Encontre a unidade mais próxima de você"
            />
            <Search />
            <Local 
                nomeUnidade="Unidade Centro"
                distacia="2.5 km"
                endereco="Rua das Flores, 123 - Centro São Paulo, SP"
                telefone="(11) 3456-7890"
                horario="Seg-Sáb: 9h-20h"
            />
            <Local 
                nomeUnidade="Unidade Jardins"
                distacia="2.5 km"
                endereco="Av. Paulista, 1000 - Jardins São Paulo, SP"
                telefone="(11) 3456-7891"
                horario="Seg-Sáb: 9h-20h"
            />
        </main>
    )
}

export default UnidadesPage;