import { createContext, useContext, useState, useEffect } from "react";
import { useEventoHoje } from '../hooks/useEventoHoje';
import apiRoutes from '../utils/apiRoutes';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [lastCheckVerificado, setLastCheckVerificado] = useState(false);
    const [precisaVerificarNotificacoes, setPrecisaVerificarNotificacoes] = useState(false);
    const { verificarECriarNotificacoes } = useEventoHoje();

    // Função para verificar e atualizar last_check
    const verificarLastCheck = async (userId) => {
        try {
            console.log('=== VERIFICANDO LAST_CHECK ===');
            console.log('User ID:', userId);

            // Buscar last_check atual
            const response = await fetch(apiRoutes.lastCheck(userId), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const lastCheckData = await response.json();
                console.log('Last check data:', lastCheckData);

                const dataHoje = new Date().toLocaleDateString('pt-BR');

                let precisaAtualizar = false;

                if (!lastCheckData.last_check) {
                    console.log('Usuário não tem last_check, precisa verificar notificações');
                    precisaAtualizar = true;
                } else {
                    const lastCheckDate = new Date(lastCheckData.last_check);
                    const lastCheckFormatada = lastCheckDate.toLocaleDateString('pt-BR');
                    console.log('Last check formatada:', lastCheckFormatada);
                    console.log('Data de hoje:', dataHoje);

                    // Se já foi verificado hoje, NÃO precisa verificar notificações
                    if (lastCheckFormatada === dataHoje) {
                        console.log('Já foi verificado hoje, NÃO precisa verificar notificações');
                        setLastCheckVerificado(true);
                        setPrecisaVerificarNotificacoes(false);
                        return;
                    } else {
                        console.log('NÃO foi verificado hoje, precisa verificar notificações');
                        precisaAtualizar = true;
                    }
                }

                if (precisaAtualizar) {
                    const updateResponse = await fetch(apiRoutes.atualizarLastCheck(userId), {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (updateResponse.ok) {
                        console.log('Last check atualizado com sucesso');
                        setLastCheckVerificado(true);
                        setPrecisaVerificarNotificacoes(true);
                    } else {
                        console.error('Erro ao atualizar last_check');
                        setLastCheckVerificado(false);
                        setPrecisaVerificarNotificacoes(false);
                    }
                }
            } else {
                console.error('Erro ao buscar last_check');
            }
        } catch (error) {
            console.error('Erro na verificação do last_check:', error);
        }
    };

    // Verificar last_check quando o usuário for definido
    useEffect(() => {
        if (usuario?.id) {
            verificarLastCheck(usuario.id);
        } else {
            setLastCheckVerificado(false);
            setPrecisaVerificarNotificacoes(false);
        }
    }, [usuario?.id]);

    return (
        <UserContext.Provider value={{
            usuario,
            setUsuario,
            lastCheckVerificado,
            precisaVerificarNotificacoes,
            verificarECriarNotificacoes
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}