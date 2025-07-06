'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserProvider } from '../UserContext';
import { useUser } from '../UserContext';
import apiRoutes from "@/utils/apiRoutes";

function GateConteudo({ children, redirect = true }) {
  const { usuario, setUsuario } = useUser();
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
          setUsuario(data.usuario);
        } else {
          if (redirect) {
            router.push('/login');
          } else {
            setStatus("not-authenticated");
          }
        }
      } catch (error) {
        // Lidar com erros de rede, etc.
        if (redirect) {
          router.push('/login');
        } else {
          setStatus("not-authenticated");
        }
      }
    };

    verificar();
  }, [router, redirect]);

  // Se não deve redirecionar e não está autenticado, não renderiza nada
  if (!redirect && status === "not-authenticated") {
    return null;
  }

  return (
    children
  )
}


export default function StatusGate({ children, redirect = true }) {

  return (
    <UserProvider>
      <GateConteudo redirect={redirect}>{children}</GateConteudo>
    </UserProvider>
  )

}
