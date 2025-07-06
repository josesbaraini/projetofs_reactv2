'use client'
import { useState, useEffect } from 'react';
import styles from './EditarEventoModal.module.css';
import apiRoutes from '@/utils/apiRoutes';

export default function EditarEventoModal({ isOpen, onClose, evento, onEventoUpdated }) {
    // Estados para os campos do evento
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [nome, setNome] = useState("")

    // Estados para feedback
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Resetar estados quando o modal abrir
    useEffect(() => {
        if (isOpen && evento) {
            setDescricao(evento.descricao || "");
            setData(evento.data || "");
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen, evento]);

    // Função para salvar alterações
    async function salvarAlteracoes() {
        if (!evento?.id) {
            setMensagem("Evento não encontrado. Tente novamente.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        try {
            const response = await fetch(apiRoutes.atualizarEvento(evento.id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    descricao: descricao,
                    data: data,
                    nome: nome
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar evento: ${response.status}`);
            }

            const result = await response.json();
            console.log('Evento atualizado com sucesso:', result);

            setMensagem("Evento atualizado com sucesso!");

            // Chamar callback para atualizar a lista de eventos
            if (onEventoUpdated) {
                onEventoUpdated();
            }

            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Erro ao salvar:', error);
            setMensagem(`Erro ao salvar: ${error.message}`);
        } finally {
            setCarregando(false);
        }
    }

    // Se não estiver aberto ou evento não carregado, não renderizar nada
    if (!isOpen || !evento?.id) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.divEditarEvento}>
                    <h2 className={styles.titulo}>Editar Evento</h2>

                    <div className={styles.campo}>
                        <label>Nome do Evento:</label>
                        <input
                            type="text"
                            value={nome}
                        
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome do evento"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Descrição:</label>
                        <textarea
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição do evento"
                            rows="3"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Data:</label>
                        <input
                            type="date"
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                    </div>

                    {carregando && (
                        <div className={styles.carregando}>
                            Salvando alterações...
                        </div>
                    )}

                    {mensagem && (
                        <div className={`${styles.mensagem} ${mensagem.includes('sucesso') ? styles.sucesso : styles.erro}`}>
                            {mensagem}
                        </div>
                    )}

                    <div className={styles.botoes}>
                        <button
                            onClick={salvarAlteracoes}
                            disabled={carregando}
                            className={styles.btnSalvar}
                        >
                            {carregando ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={carregando}
                            className={styles.btnCancelar}
                        >
                            Cancelar
                        </button>
                    </div>

                    <button className={styles.btnFechar} onClick={onClose}>X</button>
                </div>
            </div>
        </div>
    );
} 