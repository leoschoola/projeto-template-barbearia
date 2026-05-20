import { useState } from 'react';
import './BarberPage.css'
import TituloTextoPadrao from "../components/TituloTextoPadrao";
import Form from '../components/Form';
import Cards from '../components/Cards';

function AgendarPage() {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        unidade: '',
        servico: '',
        barbeiro: '',
        data: '',
        horario: '',
        observacoes: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
    }

    return (
        <main className="principal__barbeiro">
            <TituloTextoPadrao
                titulo='Agendar Horário'
                texto='Escolha o melhor horário e garanta seu atendimento'
            />

            <Form
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <Cards 
                icon="fa-solid fa-calendar-check card-icone"
                tituloCard="Confirmação Imediata"
                descricaoCard="Receba confirmação por e-mail e SMS instantaneamente"
            />
            <Cards 
                icon="fa-solid fa-clock-rotate-left card-icone"
                tituloCard="Flexibilidade"
                descricaoCard="Remarque ou cancele com até 2h de antecedência"
            />
            <Cards 
                icon="fa-solid fa-user-tie card-icone"
                tituloCard="Atendimento Premium"
                descricaoCard="Barbeiros experientes e certificados à sua disposição"
            />
        </main>
    );
}

export default AgendarPage;
