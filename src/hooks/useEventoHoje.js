import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import apiRoutes from '../utils/apiRoutes.js';

export function useEventoHoje() {
    const [dataHoje, setDataHoje] = useState(dayjs().format('DD/MM/YYYY'));

    // Example usage in a component
    const updateLastCheck = async (userId) => {
        try {
            const response = await fetch(apiRoutes.atualizarLastCheck(userId), {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Last check updated:', result);
                return result;
            } else {
                throw new Error('Failed to update last check');
            }
        } catch (error) {
            console.error('Error updating last check:', error);
            throw error;
        }
    };

    // Get last_check
    const getLastCheck = async (userId) => {
        try {
            const response = await fetch(apiRoutes.lastCheck(userId), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Last check data:', result);
                return result;
            } else {
                throw new Error('Failed to get last check');
            }
        } catch (error) {
            console.error('Error getting last check:', error);
            throw error;
        }
    };

    // Get all trainings for a user
    // TODO: MODIFICAR DEPOIS - FUNÇÃO RELACIONADA A TREINOS
    const getAllTreinos = async (userId) => {
        try {
            const response = await fetch(apiRoutes.getTreinos(userId), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('All trainings fetched:', result);
                return result;
            } else {
                throw new Error('Failed to fetch trainings');
            }
        } catch (error) {
            console.error('Error fetching trainings:', error);
            throw error;
        }
    };

    // Get all events for a user
    const getAllEventos = async (userId) => {
        try {
            const response = await fetch(apiRoutes.getEventos(userId), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('All events fetched:', result);
                return result;
            } else {
                throw new Error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    };

    // Create notification
    const criarNotificacao = async (userId, notificacao) => {
        try {
            const response = await fetch(`${apiRoutes.getNotificacoes(userId).replace('/notificacoes/', '/notificacoes/cadastro/')}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notificacao)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Notification created:', result);
                return result;
            } else {
                throw new Error('Failed to create notification');
            }
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    };

    // Main function to check and create notifications
    const verificarECriarNotificacoes = async (userId) => {
        try {
            console.log('=== INICIANDO VERIFICAÇÃO DE NOTIFICAÇÕES ===');
            console.log('User ID:', userId);
            console.log('Data de hoje:', dataHoje);

            // 1. Verificar lastCheck
            const lastCheckData = await getLastCheck(userId);
            console.log('Last check data:', lastCheckData);

            if (!lastCheckData.last_check) {
                console.log('Usuário não tem last_check, continuando...');
            } else {
                const lastCheckDate = new Date(lastCheckData.last_check);
                const lastCheckFormatada = lastCheckDate.toLocaleDateString('pt-BR');
                console.log('Last check formatada:', lastCheckFormatada);
                console.log('Data de hoje:', dataHoje);

                // Se já foi verificado hoje, não faz nada
                if (lastCheckFormatada === dataHoje) {
                    console.log('Já foi verificado hoje, saindo...');
                    return {
                        success: true,
                        message: 'Já verificado hoje',
                        notificationsCreated: 0
                    };
                }
            }

            console.log('Não foi verificado hoje, buscando eventos e treinos...');

            // 2. Buscar eventos e treinos
            const eventosResponse = await getAllEventos(userId);
            // TODO: MODIFICAR DEPOIS - BUSCA DE TREINOS
            // const treinosResponse = await getAllTreinos(userId);

            console.log('Eventos response:', eventosResponse);
            // console.log('Treinos response:', treinosResponse);

            // Extrair arrays de dados
            const eventos = eventosResponse.resposta || eventosResponse || [];
            // TODO: MODIFICAR DEPOIS - ARRAY DE TREINOS
            // const treinos = treinosResponse.resposta || treinosResponse || [];

            console.log('Eventos array:', eventos);
            // console.log('Treinos array:', treinos);

            // 3. Filtrar eventos e treinos de hoje
            const eventosHoje = eventos.filter((evento) => {
                if (!evento.data) return false;
                const eventoData = new Date(evento.data);
                const eventoDataFormatada = eventoData.toLocaleDateString('pt-BR');
                console.log('Evento data:', eventoDataFormatada, 'vs hoje:', dataHoje);
                return eventoDataFormatada === dataHoje;
            });

            // TODO: MODIFICAR DEPOIS - FILTRAGEM DE TREINOS
            // const treinosHoje = treinos.filter((treino) => {
            //     if (!treino.data) return false;
            //     const treinoData = new Date(treino.data);
            //     const treinoDataFormatada = treinoData.toLocaleDateString('pt-BR');
            //     console.log('Treino data:', treinoDataFormatada, 'vs hoje:', dataHoje);
            //     return treinoDataFormatada === dataHoje;
            // });

            console.log('Eventos de hoje:', eventosHoje);
            // console.log('Treinos de hoje:', treinosHoje);

            // 4. Criar notificações
            const notificacoesCriadas = [];
            let totalNotificacoes = 0;

            // Criar notificações para eventos
            for (const evento of eventosHoje) {
                const notificacao = {
                    nome: evento.nome || 'Evento',
                    assunto: evento.descricao || 'Você tem um evento hoje!',
                    tipo: 'Evento'
                };

                try {
                    await criarNotificacao(userId, notificacao);
                    notificacoesCriadas.push(notificacao);
                    totalNotificacoes++;
                    console.log('Notificação criada para evento:', evento.nome);
                } catch (error) {
                    console.error('Erro ao criar notificação para evento:', error);
                }
            }

            // TODO: MODIFICAR DEPOIS - CRIAÇÃO DE NOTIFICAÇÕES PARA TREINOS
            // Criar notificações para treinos
            // for (const treino of treinosHoje) {
            //     const notificacao = {
            //         nome: treino.nome || 'Treino',
            //         assunto: treino.descricao || 'Você tem um treino hoje!',
            //         tipo: 'Treino'
            //     };

            //     try {
            //         await criarNotificacao(userId, notificacao);
            //         notificacoesCriadas.push(notificacao);
            //         totalNotificacoes++;
            //         console.log('Notificação criada para treino:', treino.nome);
            //     } catch (error) {
            //         console.error('Erro ao criar notificação para treino:', error);
            //     }
            // }

            // 5. Atualizar lastCheck
            await updateLastCheck(userId);
            console.log('Last check atualizado com sucesso');

            console.log('=== VERIFICAÇÃO CONCLUÍDA ===');
            console.log('Total de notificações criadas:', totalNotificacoes);
            console.log('Notificações criadas:', notificacoesCriadas);

            return {
                success: true,
                message: `Verificação concluída. ${totalNotificacoes} notificações criadas.`,
                notificationsCreated: totalNotificacoes,
                notifications: notificacoesCriadas
            };

        } catch (error) {
            console.error('Erro na verificação de notificações:', error);
            return {
                success: false,
                message: 'Erro na verificação de notificações',
                error: error.message
            };
        }
    };

    // Test function that can be called
    const testarFuncoes = async (userId = 2) => {
        console.log('=== TESTING FUNCTIONS ===');
        console.log('User ID:', userId);
        console.log('Today\'s date:', dataHoje);

        try {
            const result = await verificarECriarNotificacoes(userId);
            console.log('Final result:', result);
            return result;
        } catch (error) {
            console.error('Test failed:', error);
            return { success: false, error: error.message };
        }
    };

    return {
        dataHoje,
        updateLastCheck,
        getLastCheck,
        getAllTreinos, // TODO: MODIFICAR DEPOIS - FUNÇÃO DE TREINOS
        getAllEventos,
        criarNotificacao,
        verificarECriarNotificacoes,
        testarFuncoes
    };
}