'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Svg from "@/components/svg";
import StatusGate from "@/components/StatusGate";
import { useUser } from '@/components/UserContext';

export default function Treinos() {
    return (
        <StatusGate>
            <TreinosConteudo />
        </StatusGate>
    );
}
function TreinosConteudo() {
    const usuario = useUser();
    const [infos, setInfos] = useState([]);
    const [passos, setPassos] = useState([]);
    const [showCriaTreino, setShowCriaTreino] = useState(false);
    const [showCriaPasso, setShowCriaPasso] = useState(false);

    // Estados para os campos do treino
    const [treinoNome, setTreinoNome] = useState("");
    const [treinoDescricao, setTreinoDescricao] = useState("");
    const [treinoAnotacoes, setTreinoAnotacoes] = useState("");

    // Estados para os campos do passo
    const [passoNome, setPassoNome] = useState("");
    const [passoPeso, setPassoPeso] = useState("");
    const [passoRepeticoes, setPassoRepeticoes] = useState("");
    const [passoSeries, setPassoSeries] = useState("");

    // Estados para feedback de carregamento e resultado
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Função para formatar a data
    function formatarData(dataISO) {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours() - 4).padStart(2, '0');
        const min = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${min}`;
    }

    const getTreinos = async () => {
        if (!usuario?.id) return;
        const response = await fetch(`https://mygymapi.dev.vilhena.ifro.edu.br/api/treinos/user/${usuario.id}`);
        if (!response.ok) {
            setInfos([
                {
                    "id": 6,
                    "modificacao_em": "2025-05-04T15:57:20.000Z",
                    "nome": "treino foda",
                    "descricao": "2",
                    "anotacoes": "4",
                    "Usuario_id": 2
                }
            ])
        }
        const data = await response.json();
        setInfos(data);
        console.log(data)
    }

    useEffect(() => {
        if (usuario) {
            getTreinos();
        }
    }, [usuario]);

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
        console.log(usuario,!usuario?.id)
        if (!usuario?.id) {
            setMensagem("Usuário não autenticado. Por favor, faça login novamente.");
            return;
        }
        const treino = {
            usuario_id: usuario.id,
            nome: treinoNome,
            descricao: treinoDescricao,
            anotacoes: treinoAnotacoes,
            passos: passos
        };
        setCarregando(true);
        setMensagem("");
        try {
            // Troque a URL abaixo pela sua rota de POST de treinos
            console.log(treino)
            const response = await fetch("https://mygymapi.dev.vilhena.ifro.edu.br/api/treinos/cadastrar", {
                method: "POST",
                credentials:'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(treino)
            });
            if (response.ok) {
                setMensagem("Cadastro realizado com sucesso!");
                // Opcional: atualizar lista de treinos, fechar modal, etc.
                setShowCriaTreino(false);
                setTreinoNome("");
                setTreinoDescricao("");
                setTreinoAnotacoes("");
                setPassos([]);
            } else {
                setMensagem("Erro ao cadastrar treino.");
            }
        } catch (e) {
            setMensagem("Erro de conexão ao cadastrar treino.");
        }
        setCarregando(false);
    }

    // Resetar feedback ao abrir modal
    function abrirCriaTreino() {
        setShowCriaTreino(true);
        setMensagem("");
        setCarregando(false);
    }

    return (
        <div className={styles.page}>
            <div className={styles.divPesquisas}>
                <div className={styles.divOrdenado}>
                    <select>
                        <option>Ordernar Por</option>
                        <option>Nome</option>
                        <option>Data de modificação</option>
                    </select>
                </div>
                <div className={styles.divPesquisa}>
                    <input></input>
                    <Svg tipo='userU'></Svg>
                </div>
            </div>
            <div className={styles.divInformacos}>
                <div className={styles.divNomeCoisas}>
                    <h1>Nome</h1>
                    <h1>Planejamento</h1>
                    <h1>Ultima Mod.</h1>
                    <h1>Descrição</h1>
                    <h1>Anotações</h1>
                    <h1>Deletar</h1>
                    <div className={styles.divLinha}></div>
                </div>
                {infos ? infos.map((info, index) => <div key={index} className={styles.divInfoCoisas}>
                    <p>{info.nome}</p>
                    <p className={styles.pMostrar}>-
                    </p>
                    <p>{formatarData(info.modificacao_em)}</p>
                    <p>{info.descricao}</p>
                    <p>{info.anotacoes}</p>
                    <p className={styles.divDeletar}></p>
                    <div className={styles.divLinha}></div>
                </div>) : ''}
            </div>
            <div className={styles.divAddTreinos}>
                <button onClick={abrirCriaTreino}>
                    Adicionar Treino
                </button>
            </div>

            {showCriaTreino && (
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
                            <div style={{ marginBottom: 10 }}>
                                <p>Anotações:</p>
                                <input value={treinoAnotacoes} onChange={e => setTreinoAnotacoes(e.target.value)} />
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
                            <button className={styles.btnFechar} onClick={() => { setShowCriaTreino(false); setShowCriaPasso(false); }}>X</button>
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
            )}
        </div>
    );
}