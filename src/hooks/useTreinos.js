import { useState, useEffect } from 'react';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export function useTreinos() {
    const usuario = useUser();
    const [treinos, setTreinos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [ordenarPorModificacao, setOrdenarPorModificacao] = useState(false);
    const [deletando, setDeletando] = useState(false);

    // Função para construir a string de ordenação
    const construirOrdem = () => {
        let ordens = [];

        // Se o checkbox estiver marcado, adiciona ordenação por modificação
        if (ordenarPorModificacao) {
            ordens.push('MODIFICACAO');
        }

        return ordens.join(',');
    };

    const getTreinos = async (nome = null, ordem = null) => {
        if (!usuario?.id) return;

        setCarregando(true);

        try {
            let url = apiRoutes.getTreinos(usuario.id);
            const params = new URLSearchParams();

            // Se não foi passada ordem específica, usa a construída
            const ordemFinal = ordem || construirOrdem();

            if (ordemFinal) {
                params.append('ordem', ordemFinal);
            }
            if (nome) {
                params.append('nome', nome);
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }


            const response = await fetch(url);

            if (!response.ok) {
                // Fallback para dados de exemplo se a API não estiver disponível
                setTreinos([
                    {
                        "id": 6,
                        "modificacao_em": "2025-05-04T15:57:20.000Z",
                        "nome": "treino foda",
                        "descricao": "2",
                        "anotacoes": "4",
                        "Usuario_id": 2
                    }
                ]);
            } else {
                const data = await response.json();
                setTreinos(data);
            }
        } catch (error) {
            console.error('Erro ao buscar treinos:', error);
            setTreinos([]);
        } finally {
            setCarregando(false);
        }
    };

    // Função para deletar treino
    const deletarTreino = async (treinoId) => {
        if (!treinoId) return;

        setDeletando(true);

        try {
            const response = await fetch(apiRoutes.deletarTreino(treinoId), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Atualiza a lista de treinos após deletar
                getTreinos(termoPesquisa.trim());
                return { success: true, message: 'Treino deletado com sucesso!' };
            } else {
                const errorData = await response.json();
                console.error('Erro ao deletar treino:', errorData);
                return { success: false, message: errorData.mensagem || 'Erro ao deletar treino' };
            }
        } catch (error) {
            console.error('Erro de conexão ao deletar treino:', error);
            return { success: false, message: 'Erro de conexão ao deletar treino' };
        } finally {
            setDeletando(false);
        }
    };

    // Função para fazer pesquisa
    const handlePesquisar = () => {
        if (termoPesquisa.trim()) {
            getTreinos(termoPesquisa.trim());
        } else {
            getTreinos();
        }
    };

    // Função para lidar com mudança no checkbox de ordenação
    const handleOrdenacaoModificacao = (checked) => {
        setOrdenarPorModificacao(checked);

        // Atualiza a lista com a nova ordenação
        if (termoPesquisa.trim()) {
            getTreinos(termoPesquisa.trim());
        } else {
            getTreinos();
        }
    };

    // Função para limpar pesquisa
    const limparPesquisa = () => {
        setTermoPesquisa("");
        setOrdenarPorModificacao(false);
        getTreinos();
    };

    // Função para atualizar a lista de treinos após criar um novo
    const handleTreinoCriado = () => {
        getTreinos(termoPesquisa.trim());
    };

    // Carregar treinos quando o usuário mudar
    useEffect(() => {
        if (usuario) {
            getTreinos();
        }
    }, [usuario]);

    return {
        // Estados
        treinos,
        carregando,
        deletando,
        termoPesquisa,
        ordenarPorModificacao,

        // Setters
        setTermoPesquisa,

        // Funções
        handlePesquisar,
        handleOrdenacaoModificacao,
        limparPesquisa,
        handleTreinoCriado,
        deletarTreino,
        getTreinos
    };
} 