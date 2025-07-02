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
                imc: Number(imc),
                biotipo: biotipo,
                metabasal: Number(metabasal)
            })
          });
          const dataAvancada = await responseAvancada.json();

      };
    
    // Resetar estados quando o modal abrir
    useEffect(() => {
        dadosCorporais.altura = dadosCorporais.altura/100
        if (isOpen && dadosCorporais) {
            setAltura(dadosCorporais.altura || "");
            setPeso(dadosCorporais.peso/100 || "");
            setImc(dadosCorporais.imc || "");
            setBiotipo(dadosCorporais.biotipo || "");
            setmetabasal(dadosCorporais.metabasal || "");
            setMensagem("");
            setCarregando(false);
        }
    }, [isOpen, dadosCorporais]);

    // Função para calcular IMC automaticamente


    // Função para salvar alterações (simulada por enquanto)
    async function salvarAlteracoes() {
        setCarregando(true);
        console.log(altura, peso, imc, biotipo, metabasal);
        setMensagem("");

        // Simular processamento
        updateUserData();
        setMensagem("Informações corporais salvas com sucesso!");


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
                                placeholder="Ex: 175"
               
                            />
                        </div>

                        <div className={styles.campo}>
                            <label>Peso (kg):</label>
                            <input
                                type="number"
                                value={peso}
                                onChange={e => setPeso(e.target.value)}
                                placeholder="Ex: 70.5"
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div className={styles.areaAvancada}>
                        <h3 className={styles.subtitulo}>Informações Avançadas</h3>

                        <div className={styles.campo}>
                            <label>IMC:</label>
                            <input
                                type="number"
                                value={imc}
                                onChange={e => setImc(e.target.value)}
                                step="0.1"
                            />

                        </div>

                        <div className={styles.campo}>
                            <label>Biotipo:</label>
                            <select
                                value={biotipo}
                                onChange={e => setBiotipo(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Selecione um biotipo</option>
                                <option value="ectomorfo">Ectomorfo </option>
                                <option value="mesomorfo">Mesomorfo </option>
                                <option value="endomorfo">Endomorfo </option>
                            </select>
                        </div>

                        <div className={styles.campo}>
                            <label>Taxa de Metabolismo Basal (kcal/dia):</label>
                            <input
                                type="number"
                                value={metabasal}
                                onChange={e => setmetabasal(e.target.value)}
                                placeholder="Ex: 1800"
                                min="800"
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