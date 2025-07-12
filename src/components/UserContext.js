import { createContext, useContext, useState, useEffect } from "react";
import { useEventoHoje } from '../hooks/useEventoHoje';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const { verificarECriarNotificacoes } = useEventoHoje();

    useEffect(() => {
        if (usuario?.id) {
            verificarECriarNotificacoes(usuario.id);
        }
    }, [usuario?.id, verificarECriarNotificacoes]);

    return (
        <UserContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}