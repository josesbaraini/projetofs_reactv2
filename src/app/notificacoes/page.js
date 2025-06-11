'use client'
import styles from "./page.module.css";
import StatusGate from "@/components/StatusGate";
import { useEffect } from "react";

export default function Notificacoes() {
         
  return (<StatusGate> 
    <div className={styles.page}>
      <div className={styles.divcompleta}>
        <div className={styles.assunto}>
          <p>Treino de XX YY marcado para Hoje</p>

        </div>

        <div className={styles.tipo}>
          <p>Treino</p>

        </div>

        <div className={styles.data}>
          <p>Anteontem</p>
        </div>
        <div className={styles.pessoa}>
          <p>Sistema</p>
        </div>
      </div>

      <div className={styles.divcompleta}>
        <div className={styles.assunto}>
          <p>Sua sequência esta em 99</p>

        </div>

        <div className={styles.tipo}>
          <p>Treino</p>

        </div>

        <div className={styles.data}>
          <p>Anteontem</p>
        </div>
        <div className={styles.pessoa}>
          <p>Sistema</p>
        </div>
      </div>
      <div className={styles.divcompleta}>
        <div className={styles.assunto}>
          <p>Treinos e tals</p>

        </div>

        <div className={styles.tipo}>
          <p>Treino</p>

        </div>

        <div className={styles.data}>
          <p>Hoje</p>
        </div>
        <div className={styles.pessoa}>
          <p>Sistema</p>
        </div>
      </div>
      <div className={styles.divcompleta}>
        <div className={styles.assunto}>
          <p>Bom Trabalho hoje!</p>

        </div>

        <div className={styles.tipo}>
          <p>Sistema</p>

        </div>

        <div className={styles.data}>
          <p>30 minutos</p>
        </div>
        <div className={styles.pessoa}>
          <p>Sistema</p>
        </div>
      </div>
      
      
  
      
    </div>
    </StatusGate>);
}