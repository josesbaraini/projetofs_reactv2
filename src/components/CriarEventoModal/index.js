'use client'
import { useState, useEffect } from 'react';
import styles from './CriarEventoModal.module.css';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export default function CriarEventoModal({ isOpen, onClose, onEventoCriado }) {
    const { usuario } = useUser();

    // Estados para os campos do evento
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");

    // Estados para feedback
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Resetar estados quando o modal abrir
    useEffect(() => {
        if (isOpen) {
            setNome("");
            setDescricao("");
            setData("");
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen]);

    // Função para criar evento
    async function criarEvento() {
        if (!usuario?.id) {
            setMensagem("Usuário não encontrado. Tente novamente.");
            return;
        }

        if (!nome.trim()) {
            setMensagem("Nome do evento é obrigatório!");
            return;
        }

        if (!data) {
            setMensagem("Data do evento é obrigatória!");
            return;
        }

        setCarregando(true);
        setMensagem("");

        try {
            const response = await fetch(apiRoutes.criarEvento, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    nome: nome.trim(),
                    descricao: descricao.trim(),
                    data: data,
                    id: usuario.id
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar evento: ${response.status}`);
            }

            const result = await response.json();
            console.log('Evento criado com sucesso:', result);

            setMensagem("Evento criado com sucesso!");

            // Chamar callback para atualizar a lista de eventos
            if (onEventoCriado) {
                onEventoCriado();
            }

            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setMensagem(`Erro ao criar evento: ${error.message}`);
        } finally {
            setCarregando(false);
        }
    }

    // Se não estiver aberto, não renderizar nada
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.divCriarEvento}>
                    <h2 className={styles.titulo}>Criar Novo Evento</h2>

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
                            Criando evento...
                        </div>
                    )}

                    {mensagem && (
                        <div className={`${styles.mensagem} ${mensagem.includes('sucesso') ? styles.sucesso : styles.erro}`}>
                            {mensagem}
                        </div>
                    )}

                    <div className={styles.botoes}>
                        <button
                            onClick={criarEvento}
                            disabled={carregando}
                            className={styles.btnSalvar}
                        >
                            {carregando ? 'Criando...' : 'Criar Evento'}
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