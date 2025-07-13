'use client'
import { useState, useEffect } from 'react';
import styles from './EditarCorporalModal.module.css';
import { useUser } from '@/components/UserContext';
import apiRoutes from '@/utils/apiRoutes';

export default function EditarCorporalModal({ isOpen, onClose, dadosCorporais }) {
    // Estados para os campos corporais
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [imc, setImc] = useState("");
    const [biotipo, setBiotipo] = useState("");
    const [metabasal, setmetabasal] = useState("");
    const { usuario } = useUser();
    // Estados para feedback
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Função para calcular IMC automaticamente (apenas para exibição)
    const calcularIMC = (altura, peso) => {
        if (altura > 0 && peso > 0) {
            const alturaMetros = altura;
            const imcCalculado = peso / (alturaMetros * alturaMetros);
            return imcCalculado.toFixed(1);
        }
        return "";
    };

    // Atualizar IMC quando altura ou peso mudarem (apenas para exibição)
    useEffect(() => {
        const novoIMC = calcularIMC(altura, peso);
        setImc(novoIMC);
    }, [altura, peso]);

    const updateUserData = async () => {
        if (!usuario?.id) return;

        const responseBasica = await fetch(apiRoutes.getDadosBasicos(usuario.id), {
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify({
                altura: Number(altura),
                peso: Number(peso),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const dataBasica = await responseBasica.json();

        const responseAvancada = await fetch(apiRoutes.getDadosAvancandos(usuario.id), {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                biotipo: biotipo,
                metabasal: Number(metabasal)
            })
        });
        const dataAvancada = await responseAvancada.json();

        if (!(dataAvancada.ok) || !(dataBasica.ok)) {
            setMensagem("Dados Avançados ou Básicos inválidos")
        } else {
            setMensagem("Informações corporais salvas com sucesso!")
        }
    };

    // Resetar estados quando o modal abrir
    useEffect(() => {
        if (isOpen && dadosCorporais) {
            setAltura(dadosCorporais.altura || "");
            setPeso(dadosCorporais.peso || "");
            setImc(dadosCorporais.imc || "");
            setBiotipo(dadosCorporais.biotipo || "");
            setmetabasal(dadosCorporais.metabasal || "");
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen, dadosCorporais]);

    // Função para salvar alterações
    async function salvarAlteracoes() {
        setCarregando(true);
        console.log(altura, peso, imc, biotipo, metabasal);
        setMensagem("");

        await updateUserData();
        setCarregando(false);
    }

    // Se não estiver aberto, não renderizar nada
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.divEditarCorporal}>
                    <h2 className={styles.titulo}>Editar Informações Corporais</h2>

                    <div className={styles.areaBasica}>
                        <h3 className={styles.subtitulo}>Informações Básicas</h3>

                        <div className={styles.campo}>
                            <label>Altura (m):</label>
                            <input
                                type="number"
                                value={altura}
                                onChange={e => setAltura(Number(e.target.value))}
                                placeholder="Ex: 1.75"
                                min='0.5'
                                max='2.5'
                                step="0.01"
                            />
                        </div>

                        <div className={styles.campo}>
                            <label>Peso (kg):</label>
                            <input
                                type="number"
                                value={peso}
                                onChange={e => setPeso(Number(e.target.value))}
                                placeholder="Ex: 70.5"
                                step="0.1"
                                min="20"
                                max="300"
                            />
                        </div>

                        <div className={styles.campo}>
                            <label>IMC (calculado automaticamente):</label>
                            <input
                                type="text"
                                value={imc}
                                readOnly
                                placeholder="Será calculado automaticamente"
                                className={styles.campoReadOnly}
                            />
                        </div>
                    </div>

                    <div className={styles.areaAvancada}>
                        <h3 className={styles.subtitulo}>Informações Avançadas</h3>

                        <div className={styles.campo}>
                            <label>Biotipo:</label>
                            <select
                                value={biotipo}
                                onChange={e => setBiotipo(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Selecione um biotipo</option>
                                <option value="ectomorfo">Ectomorfo</option>
                                <option value="mesomorfo">Mesomorfo</option>
                                <option value="endomorfo">Endomorfo</option>
                            </select>
                        </div>

                        <div className={styles.campo}>
                            <label>Taxa de Metabolismo Basal (kcal/dia):</label>
                            <input
                                type="number"
                                value={metabasal}
                                onChange={e => setmetabasal(e.target.value)}
                                placeholder="Ex: 1800"
                                min="1000"
                                max="5000"
                            />
                        </div>
                    </div>

                    {carregando && (
                        <div className={styles.carregando}>
                            Salvando informações...
                        </div>
                    )}

                    {mensagem && (
                        <div className={`${styles.mensagem} ${(mensagem.includes('sucesso')) ? styles.sucesso : styles.erro}`}>
                            {mensagem}
                        </div>
                    )}

                    <div className={styles.botoes}>
                        <button
                            onClick={salvarAlteracoes}
                            disabled={carregando}
                            className={styles.btnSalvar}
                        >
                            {carregando ? 'Salvando...' : 'Salvar Informações'}
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