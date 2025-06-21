'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserContext } from '../UserContext';
import apiRoutes from "@/utils/apiRoutes";

export default function StatusGate({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const router = useRouter()

  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await fetch(apiRoutes.autenticar, {
          credentials: "include"
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setStatus("ok");
          setUser(data.usuario);
        } else {
          router.push('/login');
        }
      } catch (error) {
        // Lidar com erros de rede, etc.
        router.push('/login');
      }
    };

    verificar();
  }, [router]);

  if (status === "loading") return <p>Carregando...</p>;

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
