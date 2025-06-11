import styles from './page.module.css'
import StatusGate from "@/components/StatusGate";
export default function Principal() {
    return (
        <StatusGate> <div className={styles.page}>
            <div className={styles.painel}>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Exercício</th>
                            <th>Repetições</th>
                            <th>Séries</th>
                            <th>Peso</th>
                            <th>Tempo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.tdN}>1</td>
                            <td className={styles.tdExercicio}>Clique</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>1</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>1</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>-</td>
                            <td className={styles.tdPeso}>-</td>
                            <td className={styles.tdTempo}>-</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.posTabela}>
                    <div className={styles.botoes}>
                        <button className={styles.button} type='submit'>
                            Começar Treino
                        </button>
                        <a href="/cadastro">Usar Outra Lista de Treinos</a>
                    </div>
                    <div className={styles.informacoes}>
                        <p>Nome do Treino:-</p>
                        <p>Tempo medio do treino:- </p>
                    </div>
                </div>
            </div>
             </div></StatusGate>
    )
}