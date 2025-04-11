'use client'
import styles from './page.module.css'
import Svg from '@/components/svg'
import { useState } from 'react';
import PerfilConteudo from '@/components/PerfilConteudo';
export default function Perfil() {
    const [opcao, setOpcao] = useState(1);
    return (
        <div className={styles.page}>
            <div className={styles.painel}>
                <div className={styles.coluna1}>
                    <div className={styles.fotoPerfil}>
                        <Svg tipo='user' altura='120px' largura='120px'></Svg>
                    </div>
                   <div className={styles.opcoes}>
                        <div onClick={() => setOpcao(1)} className={styles.opcao}>
                            <p>Informações da Conta</p>
                                {opcao === 1 && <div className={styles.barra}>
                                </div> }     

                        </div>
                        <div onClick={() => setOpcao(2)} className={styles.opcao}>
                            <p>Informações Corporais</p>
                            {opcao === 2 && <div className={styles.barra}>
                            </div> }   
                        </div>
                    </div>
                </div>
                <div className={styles.coluna2}>
                    <div className={styles.nome}>
                        <h1>Nome Usuário</h1>
                    </div>
                    <div className={styles.linha}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

                    </div>
                    <div className={styles.entrada}>
                        <p> Data: --/--/----</p>
                    </div>
                    <div className={styles.conteudo}>
                       <PerfilConteudo opcao={opcao}/>
                    </div>

                </div>
            </div>
        </div>
    ) 
}