'use client'
import Svg from "@/components/svg";
import styles from './PesquisaTreinos.module.css';

export default function PesquisaTreinos({
    termoPesquisa,
    setTermoPesquisa,
    ordenarPorModificacao,
    handleOrdenacaoModificacao,
    handlePesquisar,
    limparPesquisa
}) {
    return (
        <div className={styles.divPesquisas}>
            <div className={styles.divOrdenado}>
                <div className={styles.divCheckbox}>
                    <label className={styles.labelCheckbox}>
                        <input
                            type="checkbox"
                            checked={ordenarPorModificacao}
                            onChange={(e) => handleOrdenacaoModificacao(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                            Ordenar por data de modificação
                        </span>
                    </label>
                </div>
            </div>
            <div className={styles.divPesquisa}>
                <input
                    type="text"
                    placeholder="Pesquisar treinos..."
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handlePesquisar();
                        }
                    }}
                />
                <div
                    className={styles.iconePesquisa}
                    onClick={handlePesquisar}
                    style={{ cursor: 'pointer' }}
                >
                    <Svg tipo='pesquisa'></Svg>
                </div>
            </div>
            {(termoPesquisa || ordenarPorModificacao) && (
                <button
                    onClick={limparPesquisa}
                    className={styles.btnLimpar}
                >
                    Limpar
                </button>
            )}
        </div>
    );
} 