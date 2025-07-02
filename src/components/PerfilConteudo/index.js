'use client'
import { useState } from 'react';
import styles from './PerfilConteudo.module.css';
import { formatarDataApenas } from '@/utils/dateUtils';
import EditarPerfilModal from '@/components/EditarPerfilModal';
import EditarCorporalModal from '@/components/EditarCorporalModal';

export default function PerfilConteudo(props) {
    const [showEditarPerfil, setShowEditarPerfil] = useState(false);
    const [showEditarCorporal, setShowEditarCorporal] = useState(false);

    if (props.opcao === 1) {
        return (
            <>
                <div className={styles.opcao}>
                    <p>Nome de usuário: {props.dadosBasicos.nome}</p>


                </div>

                <div className={styles.opcao}>
                    <p>Número de telefone: {props.dadosBasicos.telefone}</p>

                </div>
                <div className={styles.opcao}>
                    <p>Endereço de e-mail: {props.dadosBasicos.email}</p>

                </div>
                <div className={styles.opcao}>
                    <p>Senha: *********</p>

                </div>
                <div className={styles.opcao}>
                    <p>Data de nascimento: {formatarDataApenas(props.dadosBasicos.data_nascimento)} </p>

                </div>
                <button
                    className={styles.btnEditarPerfil}
                    onClick={() => setShowEditarPerfil(true)}
                >
                    Editar Perfil
                </button>

                <EditarPerfilModal
                    isOpen={showEditarPerfil}
                    onClose={() => setShowEditarPerfil(false)}
                    dadosUsuario={props.dadosBasicos}
                />
            </>
        )
    } else if (props.opcao === 2) {

        const dadosCorporais = {
            altura: props.dadosBasicos.altura,
            peso: props.dadosBasicos.peso/100,
            imc: props.dadosAvancados.imc/100,
            biotipo: props.dadosAvancados.biotipo,
            taxaMetabolismo: props.dadosAvancados.metabasal/100
        };

        return (
            <>
                <div className={styles.areaBasica}>
                    <h1 className={styles.titulo}>Informações Básicas</h1>
                    <div className={styles.opcao}>
                        <p>Altura: {dadosCorporais.altura} m</p>
                    </div>
                    <div className={styles.opcao}>
                        <p>Peso: {dadosCorporais.peso} kg</p>
                    </div>
                </div>

                <div className={styles.areaAvancada}>
                    <h1 className={styles.titulo}>Informações Avançadas</h1>
                    <div className={styles.opcao}>
                        <p>IMC: {dadosCorporais.imc}</p>
                    </div>
                    <div className={styles.opcao}>
                        <p>Biotipo: {dadosCorporais.biotipo}</p>
                    </div>
                    <div className={styles.opcao}>
                        <p>Taxa de Metabolismo Basal: {dadosCorporais.taxaMetabolismo} kcal/dia</p>
                    </div>
                </div>

                <button
                    className={styles.btnEditarCorporal}
                    onClick={() => setShowEditarCorporal(true)}
                >
                    Editar Informações Corporais
                </button>

                <EditarCorporalModal
                    isOpen={showEditarCorporal}
                    onClose={() => setShowEditarCorporal(false)}
                    dadosCorporais={dadosCorporais}
                />
            </>
        )
    }
}
