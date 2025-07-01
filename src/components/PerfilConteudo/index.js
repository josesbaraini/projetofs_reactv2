'use client'
import { useState } from 'react';
import styles from './PerfilConteudo.module.css';
import Svg from '@/components/svg';
import { formatarDataApenas } from '@/utils/dateUtils';
export default function PerfilConteudo(props){
  
    if(props.opcao === 1){
        return(
            <>
            <div className={styles.opcao}>
                <p>Nome de usuário: {props.dados.nome}</p>
                
                
            </div>
            
            <div className={styles.opcao}>
                <p>Número de telefone: {props.dados.telefone}</p>
               
            </div>
            <div className={styles.opcao}>
                <p>Endereço de e-mail: {props.dados.email}</p>
                
            </div>
            <div className={styles.opcao}>
                <p>Senha: *********</p>
               
            </div>
            <div className={styles.opcao}>
                <p>Data de nascimento: {formatarDataApenas(props.dados.data_nascimento)} </p>
                
            </div>
            <p>Editar Perfil</p>
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
