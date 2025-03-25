'use client'
import { useState } from 'react';
import styles from './page.module.css'
import Svg from "@/components/svg";
export default function Treinos() {
    const [infos, setInfos] = useState([
        { 'nome': 'umNomeai', 'planejamento': '', 'mod': '20/12/02', 'decricao': 'Uma descrição ai', 'anotacoes': 'umas anoyações ai', 'deletar': '1' },
        { 'nome': 'umNomeai', 'planejamento': '', 'mod': '20/12/02', 'decricao': 'Uma descrição ai', 'anotacoes': 'umas anoyações ai', 'deletar': '2' },
        { 'nome': 'umNomeai', 'planejamento': '', 'mod': '20/12/02', 'decricao': 'Uma descrição ai', 'anotacoes': 'umas anoyações ai', 'deletar': '3' },
        { 'nome': 'umNomeai', 'planejamento': '', 'mod': '20/12/02', 'decricao': 'Uma descrição ai', 'anotacoes': 'umas anoyações ai', 'deletar': '4' }
    ])
    const [passos, setPassos] = useState(['passo1', 'passo2', 'pass'])

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
                {infos.map((info, index) => <div key={index} className={styles.divInfoCoisas}>
                    <p>{info.nome}</p>
                    <p className={styles.pMostrar}>Mostrar
                    </p>
                    <p>{info.mod}</p>
                    <p>{info.decricao}</p>
                    <p>{info.anotacoes}</p>
                    <p className={styles.divDeletar}></p>
                    <div className={styles.divLinha}></div>
                </div>)}


            </div>
            <div className={styles.divAddTreinos}>
                <button>
                    Adicionar Treino
                </button>

            </div>

            {/* <div className={styles.divCriaTreino}>
                <div className={styles.divCriaTreinoNome}>
                    <p>Nome:</p>
                    <input></input>

                </div>
                <div className={styles.divCriaTreinoDescricao}>
                    <p>Descrição:</p>
                    <input></input>
                </div>
                <div className={styles.divPassosBotoes}>
                    <div>
                        <p>Passos:</p>
                        <div className={styles.divPassos}>
                            {passos.map((passo, index) => (
                                <p key={index}>{passo}, </p>
                            ))}
                        </div>
                    </div>
                    <div className={styles.divBotoes}>
                        <div className={styles.divColunaBtn1}>
                            <button>Adicionar Anotação</button>
                            <button>Adicionar Passo</button>
                        </div>
                        <div className={styles.divColunaBtn2}>
                            <button>Confirmar</button>
                        </div>

                    </div>
                </div>

            </div> */}
            {/* <div className={styles.divCriaTreino}>
                <div className={styles.divCriaPassoNome}>
                    <div className={styles.teste}>
                        <p>Nome:</p>
                        <input></input>
                    </div>

                    <div className={styles.teste}>
                        <p>Peso:</p>
                        <input></input>
                    </div>
                    <div className={styles.teste}>
                        <p>Repeticões:</p>
                        <input></input>
                    </div>
                    <div className={styles.teste}>
                        <p>Series:</p>
                        <input></input>
                    </div>

                </div>
                <div className={styles.divColunaBtn3}>
                        <button>Confirmar</button>
                </div>

        

            </div> */}
        </div>
    )
}