import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export function useEventos() {
    const { usuario } = useUser();
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const getEventos = async () => {
        if (!usuario?.id) return;

        setCarregando(true);
        setErro(null);

        try {
            const url = apiRoutes.getEventos(usuario.id);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.mensagem && data.resposta) {
                setEventos(data.resposta);
            } else {
                setEventos([]);
            }
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            setErro('Erro ao carregar eventos');
            setEventos([]);
        } finally {
            setCarregando(false);
        }
    };

    // Função para buscar eventos por data específica
    const getEventosPorData = (data) => {
        if (!eventos || eventos.length === 0) return [];

        const dataFormatada = new Date(data).toISOString().split('T')[0];
        return eventos.filter(evento => {
            const eventoData = new Date(evento.data).toISOString().split('T')[0];
            return eventoData === dataFormatada;
        });
    };

    // Função para buscar eventos da semana atual
    const getEventosSemanaAtual = () => {
        if (!eventos || eventos.length === 0) return [];

        const hoje = new Date();
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay() ); // Segunda-feira
        inicioSemana.setHours(0, 0, 0, 0);

        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6); // Domingo
        fimSemana.setHours(23, 59, 59, 999);

        return eventos.filter(evento => {
            const eventoData = new Date(evento.data);
            return eventoData >= inicioSemana && eventoData <= fimSemana;
        });
    };

    // Carregar eventos quando o usuário mudar
    useEffect(() => {
        if (usuario) {
            getEventos();
        }
    }, [usuario]);

    return {
        // Estados
        eventos,
        carregando,
        erro,

        // Funções
        getEventos,
        getEventosPorData,
        getEventosSemanaAtual
    };
} 