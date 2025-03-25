'use client'
import styles from './page.module.css'

export default function programacaoSemanal() {
    return (
        <div className={styles.page}>
            <div className={styles.cima}>
                <p>Data: 13/03/2025</p>
                <p>Evento: Nenhum</p>
            </div>
            <div className={styles.baixo}>
                    <div className={`${styles.dia} ${styles.atual}`}>
                        <div className={`${styles.diaTitulo} ${styles.diaTituloatual}`}><p>Segunda</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
                    <div className={styles.dia}>
                        <div className={styles.diaTitulo}><p>Terça</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
                    <div className={styles.dia}>
                        <div className={styles.diaTitulo}><p>Quarta</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
                    <div className={styles.dia}>
                        <div className={styles.diaTitulo}><p>Sexta</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
                    <div className={styles.dia}>
                        <div className={styles.diaTitulo}><p>Sábado</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
                    <div className={styles.dia}>
                        <div className={styles.diaTitulo}><p>Domingo</p></div>
                        <div className={styles.treino}>
                            <p>Treino:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                        <div className={styles.evento}>
                            <p>Evento:</p>
                            <p className={styles.resposta}>Nenhum</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}