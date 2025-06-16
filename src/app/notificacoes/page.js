'use client'
import styles from "./page.module.css";
import StatusGate from "@/components/StatusGate";
import { useEffect, useState } from "react";

export default function Notificacoes() {
  const [dados, setdados] = useState(
    [
      {
        "id": 0,
        "Usuario_id": 0,
        "nome": "",
        "assunto": "",
        "tipo": "",
        "hora": "",
        "lida": 0
      }
    ]
  )
  const getNotificacoes = async () => {
    const response = await fetch('https://mygymapi.dev.vilhena.ifro.edu.br/api/notificacoes/2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    const data = await response.json();
    setdados(data)
  }

  useEffect(() => {
    getNotificacoes();
  }, []);
  return (
    <StatusGate>
      <div className={styles.page}>
      {dados? dados.map((notificacao, index) =>
        <div key={index} className={styles.divcompleta}>
        <div className={styles.assunto}>
            <p>{notificacao.assunto}</p>
        </div>
        <div className={styles.tipo}>
          <p>{notificacao.tipo}</p>
        </div>
        <div className={styles.data}>
          <p>{(notificacao.hora.split('T')[0])}</p>
        </div>
        <div className={styles.pessoa}>
          <p>{notificacao.nome}</p>
        </div>
      </div>) : ''}
      </div>
    </StatusGate>);
}