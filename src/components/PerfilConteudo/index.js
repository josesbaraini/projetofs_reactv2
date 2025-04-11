'use client'
import { useState } from 'react';
import styles from './PerfilConteudo.module.css';
import Svg from '@/components/svg';
export default function PerfilConteudo(props){
  
    if(props.opcao === 1){
        return(
            <>
            <div className={styles.opcao}>
                <p>Nome de usuário:</p>
                <input></input>
                <Svg tipo='chenge'></Svg>
            </div>
            
            <div className={styles.opcao}>
                <p>Número de telefone: 
                <input></input>(Verificado)</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Endereço de e-mail: 
                <input></input> (Verificado)</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Senha:<input></input> </p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Data de nascimento: <input></input> </p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Idioma</p>
                <select>
                    <option value="1">Português</option>
                    <option value="2">Inglês</option>
                </select>
            </div>
            <div className={styles.opcao}>
                <p>Tema</p>
                <select>
                    <option value="1">Automatico</option>
                    <option value="2">Claro</option>
                    <option value="3">Escuro</option>
                </select>
            </div>
            </>
        )
    }else if(props.opcao === 2){
        return(
            <>
                <div className={styles.areaBasica}>
                    <h1 className={styles.titulo}>Informações Básicas</h1>
                    <div className={styles.opcao}>
                        <p>Altura: <input></input></p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Peso: 
                        <input></input>
                        </p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    

                </div>
                <div className={styles.areaAvancada}>
                    <h1 className={styles.titulo}>Informações Avançadas</h1>
                    <div className={styles.opcao}>
                        <p>Imc:<input></input></p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Gordura corporal: <input></input></p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Biotipo: <input></input></p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Taxa de Metabolismo Basal: <input></input>/dia.</p>
                        <Svg tipo='chenge'></Svg>
                    </div>

                </div>
            </>
        )
    }
}
