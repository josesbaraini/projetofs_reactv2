import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
} 