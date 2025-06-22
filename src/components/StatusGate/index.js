'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserProvider } from '../UserContext';
import { useUser } from '../UserContext';
import apiRoutes from "@/utils/apiRoutes";

function GateConteudo({children}) {
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
          router.push('/login');
        }
      } catch (error) {
        // Lidar com erros de rede, etc.
        router.push('/login');
      }
    };

    verificar();
  }, [router]);

  return(
    children
  )
}


export default function StatusGate( {children}) {
  
  return (
    <UserProvider>
      <GateConteudo>{children}</GateConteudo>
    </UserProvider>
  )

}
