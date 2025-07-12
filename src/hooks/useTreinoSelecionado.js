import { useState, useEffect } from 'react';

export function useTreinoSelecionado() {
    const [treinoId, setTreinoId] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // Função para definir o treino selecionado
    const selecionarTreino = (id) => {
        setTreinoId(id);
        // Salvar no localStorage para persistir entre sessões
        localStorage.setItem('treinoSelecionado', id);
    };

    // Função para limpar o treino selecionado
    const limparTreinoSelecionado = () => {
        setTreinoId(null);
        localStorage.removeItem('treinoSelecionado');
    };

    // Função para buscar um treino padrão se nenhum estiver selecionado
    const buscarTreinoPadrao = async () => {
        if (treinoId) return treinoId; // Se já tem um selecionado, usa ele

        setCarregando(true);
        try {
            // Aqui você pode chamar uma rota que retorna um ID padrão
            // Por enquanto, vou usar um ID fixo como exemplo
            const idPadrao = 8; // Você pode substituir por uma chamada de API
            setTreinoId(idPadrao);
            localStorage.setItem('treinoSelecionado', idPadrao);
            return idPadrao;
        } catch (error) {
            console.error('Erro ao buscar treino padrão:', error);
            return null;
        } finally {
            setCarregando(false);
        }
    };

    // Carregar treino selecionado do localStorage na inicialização
    useEffect(() => {
        const treinoSalvo = localStorage.getItem('treinoSelecionado');
        if (treinoSalvo) {
            setTreinoId(parseInt(treinoSalvo));
        }
    }, []);

    return {
        treinoId,
        selecionarTreino,
        limparTreinoSelecionado,
        buscarTreinoPadrao,
        carregando
    };
} 