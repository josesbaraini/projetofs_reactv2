'use client'
import { useState, useEffect } from 'react';
import styles from './EditarPerfilModal.module.css';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export default function EditarPerfilModal({ isOpen, onClose, dadosUsuario }) {
    const { usuario } = useUser();

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

    // Função para salvar alterações
    async function salvarAlteracoes() {
        if (senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem!");
            return;
        }

        // Verificar se o usuário está carregado
        if (!usuario?.id) {
            setMensagem("Usuário não carregado. Tente novamente.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        try {
            // Se há uma foto selecionada, enviar para a API
            if (fotoPerfil) {


                const formData = new FormData();
                formData.append('profileImage', fotoPerfil); // 'foto' é o nome do campo esperado pela API


                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                // Pega o ID do usuário do contexto
                const userId = usuario.id;

                const response = await fetch(apiRoutes.fotoPerfil(userId), {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                    // Não incluir Content-Type, o navegador define automaticamente para FormData
                });

                if (!response.ok) {
                    throw new Error(`Erro ao enviar foto: ${response.status}`);
                }

                const result = await response.json();
                console.log('Foto enviada com sucesso:', result);
            }

            // Aqui você pode adicionar outras chamadas para salvar nome, email, telefone, senha
            // Por exemplo:
            // await salvarDadosUsuario({ nome, email, telefone, senha });

            setMensagem("Alterações salvas com sucesso!");
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

    // Se não estiver aberto ou usuário não carregado, não renderizar nada
    if (!isOpen || !usuario?.id) return null;

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