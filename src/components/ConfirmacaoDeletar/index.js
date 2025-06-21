'use client'
import styles from './ConfirmacaoDeletar.module.css';

export default function ConfirmacaoDeletar({
    isOpen,
    onClose,
    onConfirm,
    treinoNome,
    carregando
}) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Confirmar Exclusão</h2>
                    <button
                        className={styles.btnFechar}
                        onClick={onClose}
                        disabled={carregando}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <p>
                        Tem certeza que deseja excluir o treino <strong>"{treinoNome}"</strong>?
                    </p>
                    <p className={styles.aviso}>
                        Esta ação não pode ser desfeita.
                    </p>
                </div>

                <div className={styles.modalFooter}>
                    <button
                        className={styles.btnCancelar}
                        onClick={onClose}
                        disabled={carregando}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.btnConfirmar}
                        onClick={onConfirm}
                        disabled={carregando}
                    >
                        {carregando ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
} 