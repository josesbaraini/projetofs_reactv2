'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function StatusGate({ children }) {
  const [status, setStatus] = useState("loading")
  const router = useRouter()
  useEffect(() => {
    const verificar = async () => {
        const res = await fetch("https://mygymapi.dev.vilhena.ifro.edu.br/api/user/autenticar");
        const data = await res.json();
        if (res.ok && data.ok) {
          setStatus("ok");
        }
        router.push('/login')
    };

    verificar();
  }, []);

  if (status === "loading") return <p>Carregando...</p>;
  return children;
}
