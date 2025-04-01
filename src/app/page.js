'use client';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.painel}>
        <h1 className={styles.par}>Olá! Bem-Vindo ao<br></br><span className={styles.bolder}>My Gym</span></h1>
        <p className={styles.par}>Estamos muito felizes por você ter se juntado a nós!</p>
        <p className={styles.par}>Aqui você irá encontrar maneiras motivadoras de alcançar seus objetivos.</p>
        <p className={styles.par}>Estamos aqui pra te ajudar a cada passo da sua evolução.</p>
        <p className={styles.par}><strong>Vamos Começar!</strong></p>
        <div className={styles.logoacademia}>
          <Image className={styles.img} src='/images/academia.png' alt="Academia" width={100} height={100} />
        </div>
      </div>
    
    </div>
  );
}
