'use client';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.painel}>
        <h1 className={styles.par}>Olá! Bem-Vindo ao<br></br><span className={styles.bolder}>My Gym</span></h1>
        <p className={styles.pare}>Estamos muito felizes por você ter se juntado a nós!</p>
        <p className={styles.pare}>Vamos te ajudar a conquistar seus objetivos, passo a passo.</p>
        <p className={styles.pare}>Seu progresso começa agora.</p>
        <p className={styles.pare}><strong>Vamos juntos!</strong></p>
        <div className={styles.logoacademia}>
          <Image className={styles.img} src='/images/academia.png' alt="Academia" width={100} height={100} />
        </div>
      </div>
    
    </div>
  );
}
