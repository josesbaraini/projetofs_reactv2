'use client'
import styles from "./page.module.css";
import StatusGate from "@/components/StatusGate";
import { useEffect, useState } from "react";
import { useUser } from "@/components/UserContext";
import apiRoutes from "@/utils/apiRoutes";
import { formatarDataApenas } from "@/utils/dateUtils";

export default function Notificacoes() {
  return (
    <StatusGate>
      <NotificacoesConteudo />
    </StatusGate>
  );
}
function NotificacoesConteudo() {
  const usuario = useUser();
  const [dados, setdados] = useState([
    {
      "id": 0,
      "Usuario_id": 0,
      "nome": "",
      "assunto": "",
      "tipo": "",
      "hora": "",
      "lida": 0
    }
  ]);

  const getNotificacoes = async () => {
    if (!usuario?.id) return;
    const response = await fetch(apiRoutes.getNotificacoes(usuario.id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setdados(data);
  };

  useEffect(() => {
    if (usuario) {
      getNotificacoes();
    }
  }, [usuario]);

  return (
    <div className={styles.page}>
      {dados ? dados.map((notificacao, index) =>
        <div key={index} className={styles.divcompleta}>
          <div className={styles.assunto}>
            <p>{notificacao.assunto}</p>
          </div>
          <div className={styles.tipo}>
            <p>{notificacao.tipo}</p>
          </div>
          <div className={styles.data}>
            <p>{formatarDataApenas(notificacao.hora)}</p>
          </div>
          <div className={styles.pessoa}>
            <p>{notificacao.nome}</p>
          </div>
        </div>
      ) : ''}
    </div>
  );
}