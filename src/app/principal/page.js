import styles from './page.module.css'

export default function Principal() {
    return (
        <div className={styles.page}>
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
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>49:23</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>88:32</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>1</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>49:23</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>88:32</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>1</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>49:23</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>88:32</td>
                            <td className={styles.tdSituacao}><div className={styles.situacao}></div></td>
                        </tr>
                        <tr>
                            <td className={styles.tdN}>2</td>
                            <td className={styles.tdExercicio}>-</td>
                            <td className={styles.tdRepeticoes}>-</td>
                            <td className={styles.tdSeries}>3</td>
                            <td className={styles.tdPeso}>100kg</td>
                            <td className={styles.tdTempo}>88:32</td>
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
                        <p>Nome do Treino: treino ai paizao</p>
                        <p>Tempo medio do treino: 10 segundos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}