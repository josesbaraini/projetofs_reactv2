import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export function useEventosPorMes() {
    const { usuario } = useUser();
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1); // Janeiro = 1

    const getEventosPorMes = async (mes) => {
        if (!usuario?.id) {
            return [];
        }

        try {
            const url = apiRoutes.getEventosPorMes(usuario.id);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ mes: mes })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.mensagem && data.resposta) {
                return data.resposta;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Erro ao buscar eventos por mês:', error);
            return [];
        }
    };

    const selecionarEvento = (evento) => {
        setEventoSelecionado(evento);
    };

    const limparEventoSelecionado = () => {
        setEventoSelecionado(null);
    };

    const mudarMes = async (novoMes) => {
        setMesAtual(novoMes);
        const eventosDoMes = await getEventosPorMes(novoMes);
        setEventos(eventosDoMes);
        setEventoSelecionado(null);
    };

    // Carregar eventos do mês atual quando o usuário mudar
    useEffect(() => {
        if (usuario) {
            mudarMes(mesAtual);
        }
    }, [usuario]);

    // Função para obter nome do mês
    const getNomeMes = (mes) => {
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return meses[mes - 1] || '';
    };

    return {
        // Estados
        eventos,
        eventoSelecionado,
        carregando,
        erro,
        mesAtual,

        // Funções
        getEventosPorMes,
        selecionarEvento,
        limparEventoSelecionado,
        mudarMes,
        getNomeMes,
        recarregarEventos: () => getEventosPorMes(mesAtual)
    };
} 