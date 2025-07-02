'use client'
import { useState, useEffect } from 'react';
import styles from './EditarPerfilModal.module.css';
import { useUser } from '@/components/UserContext';

export default function EditarPerfilModal({ isOpen, onClose, dadosUsuario }) {
    // Estados para os campos do perfil
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState(null);

    // Estados para feedback
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    // Resetar estados quando o modal abrir
    useEffect(() => {
        if (isOpen && dadosUsuario) {
            setNome(dadosUsuario.nome || "");
            setEmail(dadosUsuario.email || "");
            setTelefone(dadosUsuario.telefone || "");
            setSenha("");
            setConfirmarSenha("");
            setFotoPerfil(null);
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen, dadosUsuario]);

    // Função para lidar com upload de foto
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPerfil(file);
        }
    };

    // Função para salvar alterações (simulada por enquanto)
    async function salvarAlteracoes() {
        if (senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem!");
            return;
        }

        setCarregando(true);
        setMensagem("");

        // Simular processamento
        setTimeout(() => {
            setMensagem("Alterações salvas com sucesso! (Simulação)");
            setTimeout(() => {
                onClose();
            }, 1500);
        }, 1000);

        setCarregando(false);
    }

    // Se não estiver aberto, não renderizar nada
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.divEditarPerfil}>
                    <h2 className={styles.titulo}>Editar Perfil</h2>

                    <div className={styles.campo}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Seu nome de Usuario"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Telefone:</label>
                        <input
                            type="tel"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            placeholder="(11) 99999-9999"
                        />
                    </div>

                    <div className={styles.campo}>
                        <label>Nova Senha:</label>
                        <div className={styles.senhaContainer}>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                placeholder="Deixe em branco para manter a atual"
                            />
                            <button
                                type="button"
                                className={styles.btnMostrarSenha}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className={styles.campo}>
                        <label>Confirmar Nova Senha:</label>
                        <div className={styles.senhaContainer}>
                            <input
                                type={mostrarConfirmarSenha ? "text" : "password"}
                                value={confirmarSenha}
                                onChange={e => setConfirmarSenha(e.target.value)}
                                placeholder="Confirme a nova senha"
                            />
                            <button
                                type="button"
                                className={styles.btnMostrarSenha}
                                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                            >
                                {mostrarConfirmarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className={styles.campo}>
                        <label>Foto de Perfil:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className={styles.inputFoto}
                        />
                        {fotoPerfil && (
                            <span className={styles.nomeArquivo}>{fotoPerfil.name}</span>
                        )}
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