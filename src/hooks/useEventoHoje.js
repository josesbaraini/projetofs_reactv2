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

    // Get passos for a specific training
    const getPassosTreino = async (treinoId) => {
        try {
            const response = await fetch(apiRoutes.getPassos, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ treino_Id: treinoId })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Passos do treino fetched:', result);
                return result;
            } else {
                throw new Error('Failed to fetch passos');
            }
        } catch (error) {
            console.error('Error fetching passos:', error);
            throw error;
        }
    };

    // Create training
    const criarTreino = async (treino) => {
        try {
            const response = await fetch(apiRoutes.cadastrarTreino, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(treino)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Training created:', result);
                return result;
            } else {
                throw new Error('Failed to create training');
            }
        } catch (error) {
            console.error('Error creating training:', error);
            throw error;
        }
    };

    // Update training with data_treino
    const atualizarTreinoComData = async (treinoId, dados) => {
        try {
            const response = await fetch(`${apiRoutes.cadastrarTreino.replace('/cadastrar', '')}/${treinoId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ campos: dados })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Training updated:', result);
                return result;
            } else {
                throw new Error('Failed to update training');
            }
        } catch (error) {
            console.error('Error updating training:', error);
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

    // Function to replicate training 7 days ahead
    const replicarTreino = async (treinoOriginal) => {
        try {
            // Calculate the new date (7 days from the original date)
            const dataOriginal = new Date(treinoOriginal.data_treino);
            const novaData = new Date(dataOriginal);
            novaData.setDate(novaData.getDate() + 7);

            // First, get the passos of the original training
            console.log('Buscando passos do treino original:', treinoOriginal.id);
            const passosOriginais = await getPassosTreino(treinoOriginal.id);
            console.log('Passos encontrados:', passosOriginais);

            // Prepare passos for new training (remove id and add to new training)
            const passosParaNovoTreino = passosOriginais.map(passo => ({
                nome: passo.nome,
                repeticoes: passo.repeticoes,
                peso: passo.peso,
                series: passo.series
            }));

            // First, create the training without data_treino
            const treinoParaCriar = {
                nome: treinoOriginal.nome,
                descricao: treinoOriginal.descricao,
                anotacoes: treinoOriginal.anotacoes,
                usuario_id: treinoOriginal.Usuario_id,
                passos: passosParaNovoTreino // Include the passos
            };

            console.log('Criando treino base com passos:', treinoParaCriar);
            const resultadoCriacao = await criarTreino(treinoParaCriar);
            console.log('Treino criado:', resultadoCriacao);

            // Get the ID of the created training
            const treinoId = resultadoCriacao[0]?.insertId;
            if (!treinoId) {
                throw new Error('Failed to get training ID');
            }

            // Now update the training with data_treino
            const dadosParaAtualizar = {
                data_treino: novaData.toISOString().slice(0, 19).replace('T', ' '),
                repetir: treinoOriginal.repetir,
                dia_semana: treinoOriginal.dia_semana
            };

            console.log('Atualizando treino com data:', dadosParaAtualizar);
            const resultadoAtualizacao = await atualizarTreinoComData(treinoId, dadosParaAtualizar);
            console.log('Treino replicado com sucesso:', resultadoAtualizacao);

            return resultadoAtualizacao;
        } catch (error) {
            console.error('Erro ao replicar treino:', error);
            throw error;
        }
    };

    // Main function to check and create notifications
    const verificarECriarNotificacoes = async (userId) => {
        try {
            console.log('=== INICIANDO VERIFICAÇÃO DE NOTIFICAÇÕES ===');
            console.log('User ID:', userId);
            console.log('Data de hoje:', dataHoje);

            // Buscar eventos e treinos
            const eventosResponse = await getAllEventos(userId);
            const treinosResponse = await getAllTreinos(userId);

            console.log('Eventos response:', eventosResponse);
            console.log('Treinos response:', treinosResponse);

            // Extrair arrays de dados
            const eventos = eventosResponse.resposta || eventosResponse || [];
            const treinos = treinosResponse.resposta || treinosResponse || [];

            console.log('Eventos array:', eventos);
            console.log('Treinos array:', treinos);

            // Filtrar eventos e treinos de hoje
            const eventosHoje = eventos.filter((evento) => {
                if (!evento.data) return false;
                const eventoData = new Date(evento.data);
                const eventoDataFormatada = eventoData.toLocaleDateString('pt-BR');
                console.log('Evento data:', eventoDataFormatada, 'vs hoje:', dataHoje);
                return eventoDataFormatada === dataHoje;
            });

            const treinosHoje = treinos.filter((treino) => {
                if (!treino.data_treino) return false;
                const treinoData = new Date(treino.data_treino);
                const treinoDataFormatada = treinoData.toLocaleDateString('pt-BR');
                console.log('Treino data:', treinoDataFormatada, 'vs hoje:', dataHoje);
                return treinoDataFormatada === dataHoje;
            });

            console.log('Eventos de hoje:', eventosHoje);
            console.log('Treinos de hoje:', treinosHoje);

            // Criar notificações e replicar treinos
            const notificacoesCriadas = [];
            let totalNotificacoes = 0;
            let treinosReplicados = 0;

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

            // Criar notificações para treinos e replicar se necessário
            for (const treino of treinosHoje) {
                const notificacao = {
                    nome: treino.nome || 'Treino',
                    assunto: treino.descricao || 'Você tem um treino hoje!',
                    tipo: 'Treino'
                };

                try {
                    await criarNotificacao(userId, notificacao);
                    notificacoesCriadas.push(notificacao);
                    totalNotificacoes++;
                    console.log('Notificação criada para treino:', treino.nome);

                    // Verificar se o treino se repete (repetir = 1)
                    if (treino.repetir === 1) {
                        try {
                            await replicarTreino(treino);
                            treinosReplicados++;
                            console.log('Treino replicado automaticamente:', treino.nome);
                        } catch (error) {
                            console.error('Erro ao replicar treino:', error);
                        }
                    }
                } catch (error) {
                    console.error('Erro ao criar notificação para treino:', error);
                }
            }

            console.log('=== VERIFICAÇÃO CONCLUÍDA ===');
            console.log('Total de notificações criadas:', totalNotificacoes);
            console.log('Total de treinos replicados:', treinosReplicados);
            console.log('Notificações criadas:', notificacoesCriadas);

            return {
                success: true,
                message: `Verificação concluída. ${totalNotificacoes} notificações criadas, ${treinosReplicados} treinos replicados.`,
                notificationsCreated: totalNotificacoes,
                trainingsReplicated: treinosReplicados,
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
        getAllTreinos,
        getPassosTreino,
        criarTreino,
        atualizarTreinoComData,
        getAllEventos,
        criarNotificacao,
        replicarTreino,
        verificarECriarNotificacoes,
        testarFuncoes
    };
}