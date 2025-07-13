'use client'
import { useState, useEffect } from 'react';
import styles from './CriarTreinoModal.module.css';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export default function CriarTreinoModal({ isOpen, onClose, onTreinoCriado }) {
    const { usuario } = useUser();
    const [passos, setPassos] = useState([]);
    const [showCriaPasso, setShowCriaPasso] = useState(false);

    // Estados para os campos do treino
    const [treinoNome, setTreinoNome] = useState("");
    const [treinoDescricao, setTreinoDescricao] = useState("");
    const [treinoData, setTreinoData] = useState(""); // NOVO: data
    const [treinoRepetir, setTreinoRepetir] = useState(false); // NOVO: repetir

    // Estados para os campos do passo
    const [passoNome, setPassoNome] = useState("");
    const [passoPeso, setPassoPeso] = useState("");
    const [passoRepeticoes, setPassoRepeticoes] = useState("");
    const [passoSeries, setPassoSeries] = useState("");

    // Estados para feedback de carregamento e resultado
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Resetar estados quando o modal abrir
    useEffect(() => {
        if (isOpen) {
            setTreinoNome("");
            setTreinoDescricao("");
            setTreinoData("");
            setTreinoRepetir(false);
            setPassos([]);
            setShowCriaPasso(false);
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen]);

    // Função para adicionar um passo ao array de passos
    function adicionarPasso() {
        setPassos(prev => [
            ...prev,
            {
                id: prev.length + 1,
                nome: passoNome,
                peso: Number(passoPeso),
                repeticoes: Number(passoRepeticoes),
                series: Number(passoSeries)
            }
        ]);
        setPassoNome("");
        setPassoPeso("");
        setPassoRepeticoes("");
        setPassoSeries("");
        setShowCriaPasso(false);
    }

    // Função para montar o objeto do treino e fazer o POST
    async function montarTreino() {
        if (!usuario?.id) {
            setMensagem("Usuário não autenticado. Por favor, faça login novamente.");
            return;
        }
        const treino = {
            usuario_id: usuario.id,
            nome: treinoNome,
            descricao: treinoDescricao,
            passos: passos,
            data_treino: treinoData || null, // Envia o valor YYYY-MM-DD direto
            repetir: treinoRepetir ? 1 : 0 // NOVO: repetir
        };
        /*
        // Exemplo de objeto enviado para a requisição:
        {
            usuario_id: 2,
            nome: "Treino Superior",
            descricao: "Treino de peito e costas",
            passos: [
                { nome: "Supino", peso: 40, repeticoes: 10, series: 3 },
                { nome: "Puxada", peso: 30, repeticoes: 12, series: 3 }
            ],
            data_treino: "2024-07-13T00:00:00.000Z",
            repetir: 1
        }
        */
        setCarregando(true);
        setMensagem("");
        try {
            const response = await fetch(apiRoutes.cadastrarTreino, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(treino),
                credentials: 'include'
            });
            if (response.ok) {
                setMensagem("Cadastro realizado com sucesso!");
                // Fechar modal e notificar componente pai
                setTimeout(() => {
                    onClose();
                    if (onTreinoCriado) {
                        onTreinoCriado();
                    }
                }, 1500); // Aguarda 1.5s para mostrar a mensagem de sucesso
            } else {
                setMensagem("Erro ao cadastrar treino.");
            }
        } catch (e) {
            setMensagem("Erro de conexão ao cadastrar treino.");
        }
        setCarregando(false);
    }

    // Se não estiver aberto, não renderizar nada
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.divCriaTreino}>
                    <div className={styles.divCriaTreinoNome}>
                        <p>Nome:</p>
                        <input value={treinoNome} onChange={e => setTreinoNome(e.target.value)} />
                    </div>
                    <div className={styles.divCriaTreinoDescricao}>
                        <p>Descrição:</p>
                        <input value={treinoDescricao} onChange={e => setTreinoDescricao(e.target.value)} />
                    </div>
                    {/* NOVO: campo de data */}
                    <div style={{ marginBottom: 10 }}>
                        <p>Data do treino:</p>
                        <input type="date" value={treinoData} onChange={e => setTreinoData(e.target.value)} />
                    </div>
                    {/* NOVO: campo de repetir */}
                    <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="checkbox" id="repetir" checked={treinoRepetir} onChange={e => setTreinoRepetir(e.target.checked)} />
                        <label htmlFor="repetir">Repetir semanalmente</label>
                    </div>
                    <div className={styles.divPassosBotoes}>
                        <div>
                            <p>Passos:</p>
                            <div className={styles.divPassos}>
                                {passos.length === 0 ? <span style={{ color: '#aaa' }}>Nenhum passo adicionado</span> :
                                    passos.map((passo, index) => (
                                        <span key={index}>{passo.nome}{index < passos.length - 1 ? ', ' : ''}</span>
                                    ))}
                            </div>
                        </div>
                        <div className={styles.divBotoes}>
                            <div className={styles.divColunaBtn1}>
                                <button>Adicionar Anotação</button>
                                <button onClick={() => setShowCriaPasso(true)}>Adicionar Passo</button>
                            </div>
                            <div className={styles.divColunaBtn2}>
                                <button onClick={montarTreino} disabled={carregando}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                    {carregando && <div style={{ marginTop: 10, color: '#00a' }}>Carregando...</div>}
                    {mensagem && <div style={{ marginTop: 10, color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</div>}
                    <button className={styles.btnFechar} onClick={() => { onClose(); setShowCriaPasso(false); }}>X</button>
                </div>

                {showCriaPasso && (
                    <div className={styles.divCriaTreinoPasso}>
                        <div className={styles.divCriaPassoNome}>
                            <div className={styles.teste}>
                                <p>Nome:</p>
                                <input value={passoNome} onChange={e => setPassoNome(e.target.value)} />
                            </div>
                            <div className={styles.teste}>
                                <p>Peso:</p>
                                <input type="number" value={passoPeso} onChange={e => setPassoPeso(e.target.value)} />
                            </div>
                            <div className={styles.teste}>
                                <p>Repeticões:</p>
                                <input type="number" value={passoRepeticoes} onChange={e => setPassoRepeticoes(e.target.value)} />
                            </div>
                            <div className={styles.teste}>
                                <p>Series:</p>
                                <input type="number" value={passoSeries} onChange={e => setPassoSeries(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.divColunaBtn3}>
                            <button onClick={adicionarPasso}>Confirmar</button>
                        </div>
                        <button className={styles.btnFechar} onClick={() => setShowCriaPasso(false)}>X</button>
                    </div>
                )}
            </div>
        </div>
    );
} 