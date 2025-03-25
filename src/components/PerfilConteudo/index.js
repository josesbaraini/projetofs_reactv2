'use client'
import { useState } from 'react';
import styles from './PerfilConteudo.module.css';
import Svg from '@/components/svg';
export default function PerfilConteudo(props){
  
    if(props.opcao === 1){
        return(
            <>
            <div className={styles.opcao}>
                <p>Nome de usuário: Jacob Algun sobrenome ai</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Número de telefone: +55 ** *****-9389 (Verificado)</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Endereço de e-mail: j*************@gmail.com (Verificado)</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Senha: *****************</p>
                <Svg tipo='chenge'></Svg>
            </div>
            <div className={styles.opcao}>
                <p>Data de nascimento: 3 de abr. de 2000</p>
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
                        <p>Altura: 180cm</p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Peso: 180Kg</p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    

                </div>
                <div className={styles.areaAvancada}>
                    <h1 className={styles.titulo}>Informações Avançadas</h1>
                    <div className={styles.opcao}>
                        <p>Imc: 1.99</p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Gordura corporal: 18%</p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Biotipo: Ectomorfo</p>
                        <Svg tipo='chenge'></Svg>
                    </div>
                    <div className={styles.opcao}>
                        <p>Taxa de Metabolismo Basal: 2000kal/dia.</p>
                        <Svg tipo='chenge'></Svg>
                    </div>

                </div>
            </>
        )
    }
}
