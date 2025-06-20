'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserContext } from '../UserContext';

export default function StatusGate({ children }) {
  const [user, setUser] = useState({
        "id": 2,
        "email": "josesbarainips@gmail.com",
        "role": "admin"
    });
  const [status, setStatus] = useState("ok")
  const router = useRouter()
  useEffect(() => {
    const verificar = async () => {
        const res = await fetch("https://mygymapi.dev.vilhena.ifro.edu.br/api/user/autenticar", {
          credentials:"include"
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setStatus("ok");
          setUser(data.user);
        }
        router.push('/login')
    };

    verificar();
  }, []);

  if (status === "loading") return <p>Carregando...</p>;
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
